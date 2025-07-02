import requests, re

for i in range(0, 1000):
    link = f"https://store1.warbrokers.io/{i}/get_player_list.php"

    data = requests.get(link).text

    if re.search(r'\d', data):
        print(i)
