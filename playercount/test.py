import time

FIRST_TIME = 1734319863

difference = (round(time.time() - FIRST_TIME))
difference = 45045

timestamp = difference//60//30 # gets number of half hours since original timestamp (rounded down)

timestamp2 = round(round(difference/60)/30)

print(timestamp, timestamp2, difference)