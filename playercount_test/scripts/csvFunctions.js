import * as timestampLogic from './timestampLogic.js';


const link = "https://raw.githubusercontent.com/EpicEfeathers/wb/main/data/playercount.csv"; // data link

export function returnServerColumnIndex(csvData, server) {
    // returns index (column) of the specific server we are getting playercount from

    const csvHeaders = csvData[0];

    if (server == "Worldwide") {
        return -1
    }
    csvHeaders[csvHeaders.length - 1] = csvHeaders[csvHeaders.length - 1].trim() // trims any whitespace or \n \r line breaks from the last item of the array
    return csvHeaders.indexOf(server);
}

function oneMonthAgoMidnight() {
    // Calculates the timestamp of a month ago, at midnight.
    const now = new Date();
    
    now.setMonth(now.getMonth() - 1) // move back one month
    
    now.setDate(now.getDate() + 1) // add one day (so month isn't 1 extra day long)
    
    now.setHours(0, 0, 0, 0); // set to midnight

    return now.getTime(); // returns timestamp
}


function calculateHalfHourDiff() {
    // calculates the number of half hours between now and last month at this time

    const now = Date.now()
    const startDate = oneMonthAgoMidnight(now);
    const diffInMS = now - startDate; // gets difference between the two in ms

    return Math.floor(diffInMS / (60 * 30 * 1000)); // convert ms to number of half hours
}

export function returnNumberOfItems(timeframe) {
    if (timeframe == "daily") {
        return 48;
    } else if (timeframe == "weekly") {
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

export function getServerColumnData(csvData, serverIndex) {
    // gets the specific server's data from the CSV data

    const result = []
    let tempArray = []
    if (serverIndex == -1) { // check if looking for worldwide data
        for (let i = 0; i < csvData.length; i ++) {
            const halfHourTimestamp = csvData[i][0] // get half-hour timestamp for current value
            const actualTimestamp = timestampLogic.timestampToDatetime(halfHourTimestamp) // convert it to actual timestamp
            
            // add every value together
            let temp_total = 0; 
            for (let j = 1; j < csvData[0].length - 1; j ++) { // start at 1 as not to count timestamp
                temp_total += Number(csvData[i][j]);
            }

            tempArray.push(temp_total)

            if (timestampLogic.checkIfMidnight(actualTimestamp)) { // checks if midnight, and if so, appends the last array and wipes it
                result.push(tempArray);
                tempArray = []; // reset it
            }
        }
        result.push(tempArray) // catch any extra values
    } else {
        for (let i = 0; i < csvData.length; i ++) {
            const halfHourTimestamp = csvData[i][0] // get half-hour timestamp for current value
            const actualTimestamp = timestampLogic.timestampToDatetime(halfHourTimestamp) // convert it to actual timestamp

            tempArray.push(csvData[i][serverIndex])
            if (timestampLogic.checkIfMidnight(actualTimestamp)) { // checks if midnight, and if so, appends the last array and wipes it
                result.push(tempArray);
                tempArray = []; // reset it
            }
        }
        result.push(tempArray) // catch any extra values
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