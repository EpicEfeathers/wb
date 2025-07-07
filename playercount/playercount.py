import csv
import requests
import time
import re

from server_list import check_if_missing_server

# example data
example_data = "27,NA_BATTLE_ROYALE,104.207.142.240,10,USA_4V4,144.202.52.161,2,AUSTRALIA,172.105.182.46,8,USA,45.76.19.100,21,ASIA,198.13.39.1,18,EU_4V4,192.248.184.10,1,AS_BATTLE_ROYALE,178.128.212.243,10,ASIA_4V4,45.32.31.106,7,ALIEN_DEAD_CITY,45.76.231.87,4,JAPAN,45.77.14.123,9,INDIA_CLAN,68.183.91.140,0,ASIA_CLAN,45.32.18.182,0,RUSSIA,5.22.220.247,6,JAPAN_CLAN,45.77.14.123,0,USA_WEST,165.232.63.155,17,EU_BATTLE_ROYALE,136.244.82.165,13,AS_DEAD_CITY,107.191.60.163,5,EUROPE,136.244.84.206,47,EUROPE_CLAN,80.240.16.222,0,INDIA,68.183.91.140,7,NA_DUO_BETA,66.42.125.91,0,USA_WEST_CLAN,165.232.63.155,0,USA_BETA,173.230.149.126,5,EU_DEAD_CITY,199.247.19.176,5,DEAD_CITY,108.61.203.64,3,USA_CLAN,66.42.115.45,0,AUSTRALIA_CLAN,172.105.182.46,0"

FIRST_TIME = 1741129650

def convert_data(data, timestamp, known_servers):
    pattern = re.compile(r"([A-Z_0-9]+),[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+,([0-9]+)") # splits data into two groups (using the parentheses)
    matches = pattern.findall(data)

    matches.sort(key=lambda x: x[0]) # sort by server name
    matches = dict(matches)

    # if there is a server that isn't in the header list, backfill it and track it
    known_servers = check_if_missing_server(known_servers, matches.keys())

    # if there is a server in the header list that isn't available, set it's playercount to 0
    playercounts = [matches.get(server) for server in known_servers]

    playercounts.insert(0, timestamp)

    return playercounts

def append(data):
    with open('data/playercount.csv', mode='a', newline='') as file:
        csv_writer = csv.writer(file)
        if data != "":
            csv_writer.writerow(data)  # Append a new row


def round_timestamp_to_half_hour(timestamp):
    half_hour = 1800 # seconds
    return round((timestamp // half_hour) * half_hour)


#timestamp = round(round((round(time.time()) - FIRST_TIME)/60)/30) # gets number of half hours since original timestamp (rounded to the nearest int)
timestamp = round_timestamp_to_half_hour(time.time())

# get latest timestamp
with open('data/playercount.csv', mode='r', newline='') as file: # newline='' lets CSV module handle newlines ('\n', '\r', etc.)
    lines = file.readlines()
    last_row = lines[-1] # gets last row of csv file
    last_timestamp = int(last_row.split(",")[0]) # gets the timestamp from that row (and converts to int)

    headers = lines[0].strip()
    servers = headers.split(",")[1:] # remove "Timestamp" from server list

if last_timestamp < timestamp: # makes sure not doubling on data (thanks to GitHub Actions poor scheduling)
    data = requests.get("https://store1.warbrokers.io/304/get_player_list.php").text

    if not re.search(r'\d', data): # if no number in data
        raise Exception("Error! Check magic number hasn't changed.")   
    else:
        append(convert_data(data, timestamp, servers))
        print("Success!")

print(f"Ran at {round(time.time())}")
