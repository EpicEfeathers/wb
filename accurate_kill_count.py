import requests

def accurate_kill_acount(data):
    vehicle_kills = data["kills_per_vehicle"]

    total_kill_count = sum(vehicle_kills.values())# + sum(vehicle_kills.values())
    return total_kill_count

uid = "5e57527efe3c7acc73342809"
data = requests.get(f"https://wbapi.wbpjs.com/players/getPlayer?uid={uid}").json()
total_kills = accurate_kill_acount(data)
print(total_kills)