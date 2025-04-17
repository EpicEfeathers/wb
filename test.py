import requests

data = requests.get("https://raw.githubusercontent.com/EpicEfeathers/wb/main/data/playercount.csv").text
data = data.split("\n")[:-1]
cleaned = [datum.strip().split(",") for datum in data]

cleaned = cleaned[-117:-69]
print(cleaned[0][0], cleaned[-1][0])

sum = 0
for i, item in enumerate(cleaned):
    temp_sum = 0
    for playercount in item[1:]:
        temp_sum += int(playercount)
        sum += int(playercount)
    print(f"{i}. {temp_sum}")
print(f"Length: {len(cleaned)}")

print(sum, sum/len(cleaned))
