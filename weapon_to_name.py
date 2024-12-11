 # ADD WHATEVER YOU WANT TO CONVERT HERE
dictionary_to_change = {
    "p61": 2580,
    "p105": 484,
    "p126": 54,
    "p09": 88,
    "p101": 78,
    "p68": 2305,
    "p71": 106,
    "p69": 23,
    "p65": 73,
    "p62": 484,
    "p63": 12,
    "p66": 7,
    "p67": 2903,
    "p93": 18,
    "p64": 15,
    "p94": 1,
    "p92": 163,
    "p78": 7,
    "p89": 7,
    "p11": 122,
    "p96": 2,
    "p75": 4,
    "p91": 19,
    "p88": 1,
    "p52": 4,
    "p112": 6,
    "p76": 100,
    "p58": 3,
    "p97": 21,
    "p55": 5,
    "p56": 4,
    "p104": 3,
    "p103": 1
  }


weapons = {'p09': 'AirStrike', 'p11': 'BGM', 'p52': 'TankLvl1', 'p53': 'APCLvl1', 'p54': 'HeliLvl1', 'p55': 'TankLvl2', 'p56': 'APCLvl2', 'p57': 'HeliLvl2', 'p58': 'TankLvl3', 'p59': 'APCLvl3', 'p60': 'HeliLvl3', 'p61': 'ARRifle', 'p62': 'AKRifle', 'p63': 'Pistol', 'p64': 'HuntingRifle', 'p65': 'RPG', 'p66': 'Shotgun', 'p67': 'SniperRifle', 'p68': 'SMG', 'p69': 'Homing', 'p71': 'Grenade', 'p74': 'HeliMinigun', 'p75': 'TankMinigun', 'p76': 'Knife', 'p78': 'Revolver', 'p79': 'Minigun', 'p80': 'GrenadeLauncher', 'p81': 'SmokeGrenade', 'p82': 'Jet1Rockets', 'p83': 'Jet1Homing', 'p84': 'Jet1MachineGun', 'p85': 'Jet2Rockets', 'p86': 'Jet2Homing', 'p87': 'Jet2MachineGun', 'p88': 'Fists', 'p89': 'VSS', 'p90': 'FiftyCalSniper', 'p91': 'MGTurret', 'p92': 'Crossbow', 'p93': 'SCAR', 'p94': 'TacticalShotgun', 'p95': 'VEK', 'p96': 'Desert', 'p97': 'Auto', 'p98': 'LMG', 'p99': 'UNRELEASED_WEAPON_99', 'p100': 'UnreleasedMace', 'p101': 'RubberChicken', 'p102': 'UnreleasedButterfly', 'p103': 'Chainsaw', 'p104': 'AKSMG', 'p105': 'AutoSniper', 'p106': 'UnreleasedAR', 'p107': 'UnreleasedSawedOff', 'p108': 'HealingPistol', 'p109': 'UnreleasedMP7', 'p110': 'ImplosionGrenade', 'p111': 'LaserTripMine', 'p112': 'ConcussionGrenade', 'p126': 'G3A3'}

mapped_stats = {weapons.get(key, key): value for key, value in dictionary_to_change.items()}

# sorts it by number of kills or deaths etc.
sorted_kills = dict(sorted(mapped_stats.items(), key=lambda x: x[1], reverse=True))
print(sorted_kills)