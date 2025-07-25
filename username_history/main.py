import json
import asyncio
import aiohttp
import time

from fetch_functions import fetch, check_api_health

def load() -> dict:
    with open("data/username_history.json", mode="r") as f:
        usernames = json.load(f)
        return usernames
    
def dump(usernames: dict):
    with open("data/username_history.json", mode="w") as f:
        json.dump(usernames, f, indent=4)

def round_timestamp_to_5_mins():
    timestamp = time.time()

    seconds_in_five_mins = 5* 60
    timestamp = round(timestamp / seconds_in_five_mins)

    timestamp *= seconds_in_five_mins

    return timestamp

async def main():
    timestamp = round_timestamp_to_5_mins()
    LIMIT = 100
    offset = 0
    BATCH_SIZE = 3

    usernames = load()

    async with aiohttp.ClientSession() as session:
        await check_api_health(session)

        done = False
        while not done:
            batch_links = [
                f"https://wbapi.wbpjs.com/players/ranking/xp?limit={LIMIT}&offset={offset + i * LIMIT}" for i in range(BATCH_SIZE)
            ]

            tasks = [fetch(session, link) for link in batch_links]
            results = await asyncio.gather(*tasks)

            for data in results:
                if not data: # results is the same order as tasks, meaning if there is no data, there won't be any more later
                    done = True # break out of both loops


                for player in data:
                    uid = player.get('uid')
                    nick = player.get('nick')

                    user_data: list = usernames.get(uid, [])

                    if (not user_data) or (user_data[-1]['nick'] != nick): # if new uid, or new nickname
                        user_data.append({
                            'timestamp': timestamp, 
                            'nick': nick 
                        })

                    usernames[uid] = user_data
                


            offset += LIMIT * BATCH_SIZE

        dump(usernames)

asyncio.run(main())