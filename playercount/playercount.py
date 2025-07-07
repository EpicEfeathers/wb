import csv
import requests
import time
import re

from server_list import check_if_missing_server

FIRST_TIME = 1741129650

def convert_data(data, timestamp, known_servers):
    pattern = re.compile(r"([A-Z_0-9]+),[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+,([0-9]+)") # splits data into two groups (using the parentheses)
    matches = pattern.findall(data)

    matches.sort(key=lambda x: x[0]) # sort by server name
    matches = dict(matches)

    # if there is a server in the header list that isn't available, set it's playercount to 0
    playercounts = [matches.get(server, 0) for server in known_servers]

    # if there is a server that isn't in the header list, backfill it and track it
    check_if_missing_server(known_servers, matches.keys())

    playercounts.insert(0, timestamp)


    return playercounts

def append(data):
    with open('data/playercount.csv', mode='a', newline='') as file:
        csv_writer = csv.writer(file)
        if data != "":
            csv_writer.writerow(data)  # Append a new row


def floor_timestamp_to_half_hour(timestamp):
    half_hour = 1800 # seconds
    return int((timestamp // half_hour) * half_hour)


timestamp = round(round((round(time.time()) - FIRST_TIME)/60)/30) # gets number of half hours since original timestamp (rounded to the nearest int)
#timestamp = floor_timestamp_to_half_hour(time.time())

# get latest timestamp
with open('data/playercount.csv', mode='r') as file:
    lines = file.readlines()
    last_row = lines[-1] # gets last row of csv file
    last_timestamp = int(last_row.split(",")[0]) # gets the timestamp from that row (and converts to int)

    headers = lines[0].strip() # remove \n from end
    servers = headers.split(",")[1:] # remove "Timestamp" from server list

if last_timestamp < timestamp: # makes sure not doubling on data (thanks to GitHub Actions poor scheduling)
    data = requests.get("https://store1.warbrokers.io/304/get_player_list.php").text

    if not re.search(r'\d', data): # if no number in data
        raise Exception("Error! Check magic number hasn't changed.")   
    else:
        append(convert_data(data, timestamp, servers))
        print("Success!")

print(f"Ran at {round(time.time())}")
