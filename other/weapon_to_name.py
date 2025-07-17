WEAPONS = {'p09': 'AirStrike', 'p11': 'BGM', 'p52': 'TankLvl1', 'p53': 'APCLvl1', 'p54': 'HeliLvl1', 'p55': 'TankLvl2', 'p56': 'APCLvl2', 'p57': 'HeliLvl2', 'p58': 'TankLvl3', 'p59': 'APCLvl3', 'p60': 'HeliLvl3', 'p61': 'ARRifle', 'p62': 'AKRifle', 'p63': 'Pistol', 'p64': 'HuntingRifle', 'p65': 'RPG', 'p66': 'Shotgun', 'p67': 'SniperRifle', 'p68': 'SMG', 'p69': 'Homing', 'p71': 'Grenade', 'p74': 'HeliMinigun', 'p75': 'TankMinigun', 'p76': 'Knife', 'p78': 'Revolver', 'p79': 'Minigun', 'p80': 'GrenadeLauncher', 'p81': 'SmokeGrenade', 'p82': 'Jet1Rockets', 'p83': 'Jet1Homing', 'p84': 'Jet1MachineGun', 'p85': 'Jet2Rockets', 'p86': 'Jet2Homing', 'p87': 'Jet2MachineGun', 'p88': 'Fists', 'p89': 'VSS', 'p90': 'FiftyCalSniper', 'p91': 'MGTurret', 'p92': 'Crossbow', 'p93': 'SCAR', 'p94': 'TacticalShotgun', 'p95': 'VEK', 'p96': 'Desert', 'p97': 'Auto', 'p98': 'LMG', 'p99': 'UNRELEASED_WEAPON_99', 'p100': 'UnreleasedMace', 'p101': 'RubberChicken', 'p102': 'UnreleasedButterfly', 'p103': 'Chainsaw', 'p104': 'AKSMG', 'p105': 'AutoSniper', 'p106': 'UnreleasedAR', 'p107': 'UnreleasedSawedOff', 'p108': 'HealingPistol', 'p109': 'UnreleasedMP7', 'p110': 'ImplosionGrenade', 'p111': 'LaserTripMine', 'p112': 'ConcussionGrenade', 'p126': 'G3A3'}
# ADD WHATEVER YOU WANT TO CONVERT HERE
def weapon_to_name(dictionary_to_change):
    mapped_stats = {WEAPONS.get(key, key): value for key, value in dictionary_to_change.items()}

    # sorts it by number of kills or deaths etc.
    sorted_kills = dict(sorted(mapped_stats.items(), key=lambda x: x[1], reverse=True))

    return sorted_kills