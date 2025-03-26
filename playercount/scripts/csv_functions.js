const link = "https://raw.githubusercontent.com/EpicEfeathers/wb/main/data/playercount.csv";
const first_time = 1741129650

export function return_server_index(csvHeaders, server) {
    if (server == "Worldwide") {
        return -1
    }
    // returns index of the specific server we are getting playercount from
    csvHeaders[csvHeaders.length - 1] = csvHeaders[csvHeaders.length - 1].trim() // trims any whitespace or \n \r line breaks from the last item of the array
    return csvHeaders.indexOf(server);
}

function oneMonthAgo(date) {
    // returns the date object of exactly one month ago

    const result = new Date(date);
    result.setMonth(result.getMonth() - 1); // goes back one month and finds correct date

    return result.getTime(); // convert data object to timestamp
}

function calculateHalfHourDiff() {
    // calculates the number of half hours between now and last month at this time

    const now = Date.now()
    const startDate = oneMonthAgo(now);
    const diffInMS = now - startDate; // gets difference between the two in ms

    return Math.floor(diffInMS / (60 * 30 * 1000)); // convert ms to number of half hours
}

export function return_number_of_timestamps(type) {
    if (type == "daily") {
        return 48;
    } else if (type == "weekly") {
        return 336;
    } else {
        return calculateHalfHourDiff();
    };
}

export function getCurrentHalfHour(csvData) {
    // returns the current half hour from the CSV file
    const currentHalfHour = csvData[csvData.length - 1][0]; // get timestamp of last array

    return currentHalfHour;
}

export function recentTimestamps(csvData) {
    const timestamps = []
    for (let i = 0; i < csvData.length; i ++) {
        timestamps.push(csvData[i][0])
    }

    return timestamps
}

export function getServerData(csvData, serverIndex) {
    // gets the specific server's data from the CSV data

    const result = []
    if (serverIndex == -1) { // check if looking for worldwide data
        for (let i = 0; i < csvData.length; i ++) {
            let temp_total = 0;
            for (let j = 1; j < csvData[0].length - 1; j ++) {
                temp_total += Number(csvData[i][j]);
            }
            result.push(temp_total)
        }
    } else {
        for (let i = 0; i < csvData.length; i ++) {
            result.push(csvData[i][serverIndex])
        }
    }

    return result
}

export async function fetchCSVData() {
    // fetches the CSV data from the website, and formats it into separate arrays
    const response = await fetch(link);  // Fetch the data
    const contents = await response.text();  // Get the text content
    const rows = contents.split('\n').slice(0, -1);  // Split into rows (removing last blank row)
    return rows.map(row => row.split(','));  // Return the parsed data
}