import csv

def backfill_data(server_name, known_servers):
    '''
    If a new server is found, backfill old columns with
    a playercount of 0
    '''
    # load existing data
    with open('data/playercount.csv', mode='r', newline='') as file:
        csv_reader = csv.DictReader(file)
        existing_rows = list(csv_reader)

    # for every historical row, set the playercount to 0
    for row in existing_rows:
        row[server_name] = '0'

    # add the new server name to the 
    # list of known servers, and sort
    known_servers.append(server_name)
    known_servers.sort()

    # create header by adding "Timestamp"
    header = known_servers.copy() # make a copy of the known_servers list
    header.insert(0, "Timestamp") # add "Timestamp" to make it the proper header
    # save data
    with open('data/playercount.csv', mode='w', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=header)
        writer.writeheader()
        writer.writerows(existing_rows)

    return known_servers


def check_if_missing_server(known_servers, server_list):
    '''
    Check if any server is missing from the headers
    '''
    missing_servers = [key for key in server_list if key not in known_servers]
    for server_name in missing_servers:
        known_servers = backfill_data(server_name, known_servers)

    return known_servers