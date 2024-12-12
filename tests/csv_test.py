import csv
import requests
import time

first_time = 1733961600

headers = [['Timestamp', 'Region', 'Servers', 'Players']]

regions = ["USA","USA_WEST","ASIA","JAPAN","EUROPE","INDIA","AUSTRALIA","RUSSIA"]

def convert_data(data, region, timestamp):
    response = data.split(f",{region},")
    data = [response[i + 1].split(",") for i in range(len(response) - 1)]
    player_count = sum([int(datum[2]) for datum in data if datum[2] != "0"])
    server_count = sum(1 for datum in data if datum[2] != "0")

    if server_count != 0:
        # half hours since that time
        data = [timestamp, regions.index(region), server_count, player_count]
    else:
        data = ""
    return data

def create():
    # Open the CSV file in write mode
    with open('data/playercount.csv', mode='w', newline='') as file:
        # Create a CSV writer object
        csv_writer = csv.writer(file)
        
        # Write the data to the file
        csv_writer.writerows(headers)  # Write multiple rows

def append(data):
    with open('data/playercount.csv', mode='a', newline='') as file:
        csv_writer = csv.writer(file)
        if data != "":
            print(data)
            csv_writer.writerow(data)  # Append a new row

def read():
    with open('data/playercount.csv', mode='r') as file:
        # Create a CSV DictReader object
        csv_reader = csv.DictReader(file)
        
        # Loop through each row (which will be a dictionary)
        for row in csv_reader:
            print(row)  # Each row is a dictionary where keys are column names

timestamp = (round(time.time()) - first_time)//60//30# for consistent time (every 30 mins)
for region in regions:
    data = convert_data(requests.get(f"https://store2.warbrokers.io/293//server_list.php?location={region}").text, region, timestamp)
    append(data)
#read()