import json
import time
import asyncio
import aiohttp

from data_models import Squad, SquadMember, ClassicGamemodes
from dataclasses import asdict, is_dataclass
from fetch_functions import fetch, get_squad_uids, get_user_data, check_api_health

batch_size = 3 # how many squads to do at once

def calculate_kills_data(user_data: dict, ignored_weapons) -> int:
    kills_per_vehicle = user_data.get("kills_per_vehicle", {}) or {}
    kills_per_weapon = user_data.get("kills_per_weapon", {}) or {}
    kills = sum(value for key, value in kills_per_vehicle.items() if key != "v30") # "or {}" if kills_per_vehicle is None

    filtered_kills_per_weapon = {key: value for key, value in kills_per_weapon.items() if key not in ignored_weapons}
    kills += sum(filtered_kills_per_weapon.values())

    return kills

def calculate_deaths_data(user_data: dict) -> int:
    deaths_per_weapon = user_data.get("deaths", {}) or {}
    self_destructs = user_data.get("self_destructs", {}) or {}

    # calculate deaths (weapon deaths + self-destructs)
    deaths = sum(deaths_per_weapon.values())
    deaths += sum(self_destructs.values())

    return deaths

async def get_squad(session, squad_name, ignored_weapons) -> Squad:
    members = []

    squad_uids = await get_squad_uids(session, squad_name)

    for uid in squad_uids:
        try:
            user_data = await get_user_data(session, uid)

            wins: dict = user_data.get("wins", {}) or {} # if value is null (if player has no wins) then return empty dict instead of breaking

            member = SquadMember(
                name=user_data.get("nick", ""),
                uid=user_data.get("uid"),
                level=user_data.get("level", 0),
                xp=user_data.get("xp", 0),
                kills=calculate_kills_data(user_data, ignored_weapons),
                deaths=calculate_deaths_data(user_data),
                br_wins=wins.get("m11", 0),
                classic_wins=ClassicGamemodes(
                    death_match=wins.get("m00", 0),
                    missile_launch=wins.get("m10", 0),
                    vehicle_escort=wins.get("m08", 0),
                    package_drop=wins.get("m09", 0),
                    capture_point=wins.get("m07", 0)
                ),
                jumps=user_data.get("number_of_jumps", 0),
                coins=user_data.get("coins", 0),
                kills_elo=user_data.get("killsELO", 1500), # 1500 is base value for a new player
                games_elo=user_data.get("gamesELO", 1500),
                last_seen=user_data.get("time")
            )

            members.append(member)
        except Exception as e:
            raise Exception(f"[ERROR] Error fetching data for uid '{uid}'. \n\nException: {e}")

    return Squad(squad_name=squad_name, members=members)

def serialize_dataclass(obj):
    """
    Turns dataclass into a dict (including properties!!!),
    without having to worry about sub-dataclasses etc.
    """
    if is_dataclass(obj):
        # for normal fields
        result = {key: serialize_dataclass(value) for key, value in asdict(obj).items()}

        # for computed @property fields
        for attr in dir(obj): # loops over all attributes (fields, methods, properties, etc.)
            if isinstance(getattr(type(obj), attr, None), property): # if the attribute is a property
                result[attr] = serialize_dataclass(getattr(obj, attr)) # getattr gets the VALUE of the attr (e.g. if attr is "kdr" then getattr could be 2.3)

        return result
    # if it's a list
    elif isinstance(obj, list):
        return [serialize_dataclass(v) for v in obj]
    # if it's a dictionary
    elif isinstance(obj, dict):
        return {key: serialize_dataclass(value) for key, value in obj.items()}
    else: # if a primitive value (e.g. str, int, etc.)
        return obj

def save_to_file(squad_data: Squad):
    with open("data/squad_data.json", mode="w") as f:
        json.dump(serialize_dataclass(squad_data), f, indent=4)

async def main():
    async with aiohttp.ClientSession() as session:
        await check_api_health(session)

        ignored_weapons = await fetch(session, "https://raw.githubusercontent.com/EpicEfeathers/BrokerStats/refs/heads/main/config.py")

        squad_list = await fetch(session, "https://wbapi.wbpjs.com/squad/getSquadList")

        squads_data: dict[str, Squad] = {}

        for i in range(0, len(squad_list), batch_size):
            print(f"{round(i/len(squad_list)*100, 1)}% complete")
            batch = squad_list[i:i+batch_size]

            tasks = [get_squad(session, squad_name, ignored_weapons) for squad_name in batch]
            results = await asyncio.gather(*tasks)

            for name, squad in zip(batch, results):
                squads_data[name] = squad
        
        save_to_file(squads_data)

start = time.time()
try:
    asyncio.run(main())
except Exception:
    raise Exception(f"[ERROR] Error when trying to fetch squads, falling back to old stats.")
print(f"Time taken: {round(time.time() - start, 2)}s")