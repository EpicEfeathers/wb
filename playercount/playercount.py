import csv
import requests
import time
import re

FIRST_TIME = 1741129650

def convert_data(data, timestamp):
    pattern = re.compile(r"([A-Z_0-9]+),[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+,([0-9]+)")
    matches = pattern.findall(data)

    matches.sort(key=lambda x: x[0])

    data = [int(match[1]) for match in matches]

    data.insert(0, timestamp)

    return data

def append(data):
    with open('data/playercount.csv', mode='a', newline='') as file:
        csv_writer = csv.writer(file)
        if data != "":
            #print(data)
            csv_writer.writerow(data)  # Append a new row

def read():
    with open('data/playercount.csv', mode='r') as file:
        csv_reader = csv.DictReader(file)
        
        for row in csv_reader:
            print(row)  # Each row is a dictionary where keys are column names


timestamp = round(round((round(time.time()) - FIRST_TIME)/60)/30) # gets number of half hours since original timestamp (rounded to the nearest int)

with open('data/playercount.csv', mode='r') as file:
    last_row = file.readlines()[-1] # gets last row of csv file
    last_timestamp = int(last_row.split(",")[0]) # gets the timestamp from that row (and converts to int)

if last_timestamp < timestamp: # makes sure not doubling on data (thanks to GitHub Actions poor scheduling)
    data = requests.get("https://store1.warbrokers.io/301/get_player_list.php").text

    if "File not found!" in data: # check if file not found error
        raise Exception("File not found error! Check magic number hasn't changed.")   
    else:
        append(convert_data(data, timestamp))
        print("Success!")

print(f"Ran at {round(time.time())}")