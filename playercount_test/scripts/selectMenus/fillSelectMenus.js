const servers = ["Worldwide","ASIA","ASIA_4V4","ASIA_CLAN","AS_BATTLE_ROYALE","AS_DEAD_CITY","AUSTRALIA","AUSTRALIA_CLAN","DEAD_CITY","EUROPE","EUROPE_CLAN","EU_4V4","EU_BATTLE_ROYALE","EU_DEAD_CITY","INDIA","INDIA_CLAN","JAPAN","JAPAN_CLAN","NA_BATTLE_ROYALE","NA_DUO_BETA","RUSSIA","USA","USA_4V4","USA_BETA","USA_CLAN","USA_WEST","USA_WEST_CLAN"];
const serverSelect = document.getElementById("serverSelect");

export function populateServerSelectMenu() {
    servers.forEach(server => {
        const option = document.createElement("option");
        option.text = server;
    
        serverSelect.appendChild(option);
    })
}






const time_zone_abbreviations = {
    "UTC-12:00": -12, // - International Date Line West
    "UTC-11:00": -11, // - Samoa Standard Time
    "UTC-10:00": -10, // - Hawaii-Aleutian Standard Time
    "UTC-09:00": -9, // - Alaska Standard Time
    "UTC-08:00": -8, // - Pacific Time
    "UTC-07:00": -7, // - Mountain Time
    "UTC-06:00": -6, // - Central Time
    "UTC-05:00": -5, // - Eastern Standard Time
    "UTC-04:00": -4, // - Atlantic Standard Time
    "UTC-03:00": -3, // - Argentina Time
    "UTC-02:00": -2, // - South Georgia Time
    "UTC-01:00": -1, // - Azores Time
    "UTC±00:00": 0, // - Greenwich Mean Time
    "UTC+01:00": 1, // - Central European Time
    "UTC+02:00": 2, // - Eastern European Time
    "UTC+03:00": 3, // - Moscow Standard Time
    "UTC+04:00": 4, // - Gulf Standard Time
    "UTC+05:00": 5, // - Pakistan Standard Time
    "UTC+05:30": 5.5, // - India Standard Time
    "UTC+06:00": 6, // - Bangladesh Standard Time
    "UTC+07:00": 7, // - Indochina Time
    "UTC+08:00": 8, // - China Standard Time
    "UTC+09:00": 9, // - Japan Standard Time
    "UTC+10:00": 10, // - Australian Eastern Time
    "UTC+11:00": 11, // - Solomon Islands Time
    "UTC+12:00": 12, // - New Zealand Time
}

export function populateTimezoneSelectMenu() {
    const selectMenu = document.getElementById("timezoneSelect");

    const utc_offset = -(new Date().getTimezoneOffset() / 60).toString()

    for (const timezone in time_zone_abbreviations) {
        const option = document.createElement("option");
        option.textContent = timezone

        if (time_zone_abbreviations[timezone] == utc_offset) {
            option.selected = true;
        }
        selectMenu.appendChild(option)
    }

    return utc_offset;
}