import csv

#server_list = "ALIEN_DEAD_CITY,ASIA,ASIA_4V4,ASIA_CLAN,AS_BATTLE_ROYALE,AS_DEAD_CITY,AUSTRALIA,AUSTRALIA_CLAN,DEAD_CITY,EUROPE,EUROPE_CLAN,EU_4V4,EU_BATTLE_ROYALE,EU_DEAD_CITY,INDIA,INDIA_CLAN,JAPAN,JAPAN_CLAN,NA_BATTLE_ROYALE,NA_DUO_BETA,RUSSIA,USA,USA_4V4,USA_BETA,USA_CLAN,USA_WEST,USA_WEST_CLAN"

#header = "Timestamp,ASIA,ASIA_4V4,ASIA_CLAN,AS_BATTLE_ROYALE,AS_DEAD_CITY,AUSTRALIA,AUSTRALIA_CLAN,DEAD_CITY,EUROPE,EUROPE_CLAN,EU_4V4,EU_BATTLE_ROYALE,EU_DEAD_CITY,INDIA,INDIA_CLAN,JAPAN,JAPAN_CLAN,NA_BATTLE_ROYALE,NA_DUO_BETA,RUSSIA,USA,USA_4V4,USA_BETA,USA_CLAN,USA_WEST,USA_WEST_CLAN"

def backfill_data(server_name, known_servers):
    # load existing data
    with open('data/playercount_cleaned.csv', mode='r') as file:
        csv_reader = csv.DictReader(file)
        existing_rows = list(csv_reader)

        #print(existing_rows)

    known_servers.append(server_name)
    known_servers.sort()
    # for every historical row, set the playercount to 0
    for row in existing_rows:
        row[server_name] = 0

    # save data
    known_servers.insert(0, "Timestamp")
    print(known_servers)
    with open('data/playercount_cleaned.csv', mode='w') as f:
        writer = csv.DictWriter(f, fieldnames=known_servers)
        writer.writeheader()
        writer.writerows(existing_rows)


def check_if_missing_server(known_servers, server_list):
    '''
    Check if any server is missing from the headers
    '''
    missing_servers = [key for key in server_list if key not in known_servers]
    for server_name in missing_servers:
        print(server_name)
        backfill_data(server_name, known_servers)

        
        

#check_if_missing_server(header, server_list)