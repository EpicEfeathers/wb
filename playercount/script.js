import * as csv_functions from './scripts/csv_functions.js'
import * as chart_functions from './scripts/charts.js'
import * as timezone_functions from './scripts/timezones.js'
import * as server_choce from './scripts/server_choice.js'

const type = "daily"
let server = "Worldwide"
const link = "https://raw.githubusercontent.com/EpicEfeathers/wb/main/data/playercount.csv";
const first_time = 1741129200


// Async function to fetch and return the data

function timestamps_to_hours(timestamps, utcOffset) {
    //console.log(timestamps)

    const hour_timestamps = []

    for (let timestamp of timestamps) {
        timestamp = timestamp * 60 * 30 + first_time; // convert it to unix timestamp
        timestamp = timestamp * 1000; // convert to ms

        const date = new Date(timestamp);

        const hour = (date.getUTCHours() + utcOffset + 24) % 24; // keeps time in bounds of (0-23)
        let minutes = date.getMinutes();

        if (minutes < 10) {
            minutes = "0" + minutes
        }

        hour_timestamps.push(`${hour}:${minutes}`)

    }

    return hour_timestamps
}

async function processData(utcOffset, server) {
    let csvData = await csv_functions.fetchCSVData();  // Wait for the data to be ready
    
    const timestamps_num = csv_functions.return_number_of_timestamps(type); // returns number of timestamps to look for
    const serverIndex = csv_functions.return_server_index(csvData[0], server);
    const currentHalfHour = csv_functions.getCurrentHalfHour(csvData);
    csvData = csvData.slice(-timestamps_num); // slices data, removing unnecessary parts
    
    const timestamps = csv_functions.recentTimestamps(csvData);
    const hour_timestamps = timestamps_to_hours(timestamps, utcOffset);
    const playercount = csv_functions.getServerData(csvData, serverIndex);

    chart_functions.createChart(hour_timestamps, playercount);

}

const utcOffset = timezone_functions.populateTimezoneSelectMenu();
server_choce.populateServerChoice();
processData(utcOffset, server);  // Calling the function that processes the data


// listen for timezone changes
const timezoneSelect = document.getElementById("timezoneSelect");
timezoneSelect.addEventListener("change", function() {
    const selectedOffset = timezoneSelect.value;

    //console.log("Selected UTC offset:", selectedOffset);

    const utcOffset = timezone_functions.updateTimezone(selectedOffset);

    processData(utcOffset, server);
});


// listen for server changes
const serverSelect = document.getElementById("serverSelect");
serverSelect.addEventListener("change", function() {
    const selectedServer = serverSelect.value;

    //console.log("Selected server: ", selectedServer);

    processData(utcOffset, selectedServer)
});




// Update Footer Date
document.getElementById("footer").textContent = new Date().getFullYear()