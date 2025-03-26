/*const time_zone_abbreviations = {
    "IDLW (UTC-12:00)": -12, // - International Date Line West
    "SST (UTC-11:00)": -11, // - Samoa Standard Time
    "HAST UTC-10:00)": 1, // - Hawaii-Aleutian Standard Time
    "AKST UTC-09:00)": 1, // - Alaska Standard Time
    "PT (UTC-08:00)": 1, // - Pacific Time
    "MT (UTC-07:00)": 1, // - Mountain Time
    "CT (UTC-06:00)": 1, // - Central Time
    "EST (UTC-05:00)": 1, // - Eastern Standard Time
    "AST (UTC-04:00)": -4, // - Atlantic Standard Time
    "ART (UTC-03:00)": 1, // - Argentina Time
    "GST (UTC-02:00)": 1, // - South Georgia Time
    "AZOT (UTC-01:00)": 1, // - Azores Time
    "GMT (UTC±00:00)": 1, // - Greenwich Mean Time
    "CET (UTC+01:00)": 1, // - Central European Time
    "EET (UTC+02:00)": 1, // - Eastern European Time
    "MSK (UTC+03:00)": 1, // - Moscow Standard Time
    "GST (UTC+04:00)": 1, // - Gulf Standard Time
    "PKT (UTC+05:00)": 1, // - Pakistan Standard Time
    "IST (UTC+05:30)": 1, // - India Standard Time
    "BST (UTC+06:00)": 1, // - Bangladesh Standard Time
    "ICT (UTC+07:00)": 1, // - Indochina Time
    "CST (UTC+08:00)": 1, // - China Standard Time
    "JST (UTC+09:00)": 1, // - Japan Standard Time
    "AET (UTC+10:00)": 1, // - Australian Eastern Time
    "SBT (UTC+11:00)": 1, // - Solomon Islands Time
    "NZT (UTC+12:00)": 1, // - New Zealand Time
}*/

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
    const selectMenu = document.getElementById("timezone-select");

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

    /*time_zone_abbreviations.forEach(optionText => {
        const option = document.createElement("option");
        option.textContent = optionText
        selectMenu.appendChild(option)
    });*/
}

export function updateTimezone(selectedTimezone) {
    return time_zone_abbreviations[selectedTimezone];
}