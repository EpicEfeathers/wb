import asyncio
import aiohttp
import json
import time

request_count = 0

async def fetch(session, url, retries=5, pause=2):
    '''
    Fetches the specified url
    '''
    global request_count
    request_count += 1 # count number of requests
    for attempt in range(retries):
        try:
            async with session.get(url) as response:
                response.raise_for_status()
                return await response.json()
        except Exception as e:
            if attempt < (retries - 1):
                await asyncio.sleep(pause)
            else:
                raise Exception(f"[ERROR] Failed to fetch url \"{url}\" \n\nException: {e}")
	
async def fetch_squad_members(squad, session):
    '''
    Fetches the uid's of all members of a squad
    '''
    url = "https://wbapi.wbpjs.com/squad/getSquadMembers?squadName="

    squad_data = await fetch(session, url + squad)

    # return list of squad member uids
    try:
        return [squad_member.get("uid") for squad_member in squad_data]
    except Exception as e:
        raise Exception(f"[ERROR] Failed to fetch squad members for squad '{squad_data}'")

async def get_player_data(player_uid, session):
    '''
    Gets and formats relevant player data for a specific uid
    '''
    url = f"https://wbapi.wbpjs.com/players/getPlayer?uid={player_uid}"

    data = await fetch(session, url)

    # kills data
    kills_per_vehicle = data.get("kills_per_vehicle", {}) or {} # if value is null (if player has no kills) then return empty dict instead of breaking
    kills_per_weapon = data.get("kills_per_weapon", {}) or {}

    kills = sum(value for key, value in kills_per_vehicle.items() if key != "v30") # "or {}" if kills_per_vehicle is None

    kills += sum(kills_per_weapon.values())

    # deaths data
    deaths_per_weapon = data.get("deaths", {}) or {}
    self_destructs = data.get("self_destructs", {}) or {}

    # calculate deaths (weapon deaths + self-destructs)
    deaths = sum(deaths_per_weapon.values())
    deaths += sum(self_destructs.values())

    # wins data
    wins = data.get('wins', {}) or {} # empty dict if missing
    classic_wins = sum(value for key, value in wins.items() if key != "m11")
    br_wins = wins.get('m11', 0)

    # elo data
    kills_elo = data.get("killsELO", 1500) # 1500 is base kelo and gelo if unknown
    games_elo = data.get("gamesELO", 1500)

    # level / xp data
    level = data.get("level", 0)
    xp = data.get("xp", 0)

    # coin data
    coins = data.get("coins", 0)

    time_last_seen = data.get("time", 0)
    seen_recently = 1 if time.time() - time_last_seen < 604800 else 0 # 604800s is a week. Count number of recently seen players (1 is that yes, they have played in this week)



    stats_dict = {
        "kills": kills,
        "deaths": deaths,
        "classic_wins": classic_wins,
        "br_wins": br_wins,
        "kills_elo": kills_elo,
        "games_elo": games_elo,
        "level": level,
        "xp": xp,
        "seen_recently": seen_recently,
        "coins": coins
    }

    return stats_dict
    
async def get_squad_data(squad_uids, squad_name, session):
    '''
    Gets the squad data, using each individual member's uid
    '''
    squad_data = {
        "kills": 0,
        "deaths": 0,
        "classic_wins": 0,
        "br_wins": 0,
        "kills_elo": 0,
        "games_elo": 0,
        "level": 0,
        "xp": 0,
        "seen_recently": 0
    }

    for uid in squad_uids:
        try:
            player_data = await get_player_data(uid, session) 

            squad_data = {key: squad_data[key] + player_data[key] for key in squad_data}
        except Exception as e:
            raise Exception(f"[ERROR] Error fetching data for uid '{uid}'. \n\nException: {e}")

    squad_data["squad_name"] = squad_name

    return squad_data

async def fetch_squad(squad_name, session):
    '''
    Function to fetch the necessary data for a squad
    '''
    try:
        squad_members = await fetch_squad_members(squad_name, session)
        return squad_name, await get_squad_data(squad_members, squad_name, session) # returning squad name makes it easier to parse data
    except Exception as e:
        raise Exception(f"[ERROR] Error fetching squad \'{squad_name}\'. \n\nException: {e}")
    
async def check_api_health(session):
    try:
        resp = await fetch(session, "https://wbapi.wbpjs.com/ping")
        if resp == "pong!":
            print("[INFO] API is up and running! Continuing with squad fetching.")
            return True
        else:
            raise Exception(f"[ERROR] Unexpected ping response: {resp}")
    except Exception as e:
        raise Exception(f"[ERROR] API ping request failed: {e}")

async def fetch_all():
    '''
    Main function to fetch all the squads and their data
    '''
    async with aiohttp.ClientSession() as session:
        # first, check is API is up
        await check_api_health(session)

        
        # get list of all squads
        squad_list = await fetch(session, "https://wbapi.wbpjs.com/squad/getSquadList")

        # loop through each squad
        squad_data = {}

        batch_size = 3 # how many to do at once
        
        for i in range(0, len(squad_list), batch_size): # loop through all, skipping by 3
            batch = squad_list[i:i+batch_size]

            tasks = [
                fetch_squad(squad_name, session) for squad_name in batch
            ]
            results = await asyncio.gather(*tasks, return_exceptions=True)

            # handle results
            for result in results:
                if isinstance(result, tuple): # if proper tuple (squad name, info dict)
                    squad_name, data = result
                    squad_data[squad_name] = data
                else:
                    raise Exception(f"[ERROR] Error fetching squad. \n\n{result}")

            #print(f"{round(i/len(squad_list)*100)}% complete...")

        # save data to file
        with open("squad_info/squad_data.json", "w") as f:
             json.dump(squad_data, f, indent=4)

start = time.time()
try:
    asyncio.run(fetch_all())
except Exception as e:
    raise Exception(f"[ERROR] Error when trying to fetch squads, falling back to old stats. \n\n{e}")
print(time.time() - start)

print(f"Number of requests: {request_count}")