import csv
import requests
import time

FIRST_TIME = 1733961600
HEADERS = [['Timestamp', 'Region', 'Servers', 'Players']]
REGIONS = ["USA","USA_WEST","ASIA","JAPAN","EUROPE","INDIA","AUSTRALIA","RUSSIA"]

def convert_data(data, region, timestamp):
    """
    Converts data into a usable format
    """
    response = data.split(f",{region},") # splits up data by region name (easier to handle)
    data = [part.split(",") for part in response[1:]] # removes first piece of data (unnecessary) and splits it up
    player_count = sum(int(datum[2]) for datum in data if datum[2] != "0") # adds player count to total
    server_count = sum(1 for datum in data if datum[2] != "0") # adds server count to total

    if server_count != 0:
        data = [timestamp, REGIONS.index(region), server_count, player_count]
    else:
        data = ""
    return data

def create():
    # Open the CSV file in write mode
    with open('data/playercount.csv', mode='w', newline='') as file:
        csv_writer = csv.writer(file)
        
        csv_writer.writerows(HEADERS)  # Write multiple rows

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


timestamp = (round(time.time()) - FIRST_TIME)//60//30 # gets number of half hours since original timestamp (rounded down)

with open('data/playercount.csv', mode='r') as file:
    last_row = file.readlines()[-1] # gets last row of csv file
    last_timestamp = int(last_row.split(",")[0]) # gets the timestamp from that row (and converts to int)

if last_timestamp < timestamp: # makes sure not doubling on data (thanks to GitHub Actions poor scheduling)
    for region in REGIONS:
        data = convert_data(requests.get(f"https://store2.warbrokers.io/293//server_list.php?location={region}").text, region, timestamp)
        append(data)

print(f"Ran at {round(time.time())}")