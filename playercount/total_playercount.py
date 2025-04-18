import csv
import requests
import time

FIRST_TIME = 1744906500

def totalPlayerCount():
    return requests.get("https://wbapi.wbpjs.com/status/playerCount").text

def append(data):
    with open('data/total_playercount.csv', mode='a', newline='') as file:
        csv_writer = csv.writer(file)
        if data != "":
            csv_writer.writerow(data)  # Append a new row

timestamp = int(round((round(time.time()) - FIRST_TIME)/60)/30) # gets number of half hours since original timestamp (rounded to the nearest int)

append((timestamp, totalPlayerCount()))