import * as csvFunctions from './csvFunctions.js'
import { returnMovingAvg } from './movingAvg.js';
import { createChart } from './chart/charts.js';
import { formatTimestampsForChart } from './timestampLogic.js';

function fillEmptyData(playercountData, desiredArrayLength) {
    // fills the array with subarrays with values of null,
    // so that the length is proper.
    // (e.g. an array of length 25 becomes 30 for a 30-day month)

    const nullArray = new Array(desiredArrayLength - playercountData.length).fill([null]); // fills array with null if necessary
    const updatedPlayercount = nullArray.concat(playercountData); // combines the two

    return updatedPlayercount;
}

function getDaysInLastMonth() {
    const today = new Date(); // Get current date
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // getMonth() is 0-based, so +1 to get 1-based month

    // Get the last month's days count
    return new Date(year, month - 1, 0).getDate();
}

function getLastXDays(x) {
    const dates = [];
    const today = new Date(); // Get current date

    for (let i = x - 1; i >= 0; i--) { // Start from the oldest day
        const pastDate = new Date();
        pastDate.setDate(today.getDate() - i); // Go back i days

        // Format as "Month Day" (e.g., "March 1")
        const formattedDate = pastDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
        dates.push(formattedDate);
    }

    return dates;
}

function calculateMonthly() {

}

export function processData(csvData, timezone, server, timeframe) {
    const columnIndex = csvFunctions.returnServerColumnIndex(csvData, server) // returns the index of the correct column for the requested data
    const numberOfItems = csvFunctions.returnNumberOfItems(timeframe); // returns the number of items we are looking for

    if (csvData[0][0] === "Timestamp") { // remove HEADERS if necessary
        csvData = csvData.slice(1);
    }
    csvData = csvData.slice(Math.max(csvData.length - numberOfItems, 0)) // crop to necessary data (use max to make sure value doesn't go below 0)


    const playercount = csvFunctions.getServerColumnData(csvData, columnIndex) // returns correct data for the index

    const daysInLastMonth = getDaysInLastMonth() // returns number of days in last month
    //const nullArray = new Array(daysInLastMonth - playercount.length).fill([null]) // fills array with null if necessary
    //const updatedPlayercount = nullArray.concat(playercount) // combines the two
    const updatedPlayercount = fillEmptyData(playercount, daysInLastMonth); // fills array to necessary length if missing data


    const averagedPlayercount = returnMovingAvg(updatedPlayercount) // returns the averaged values
    const formattedTimestamps = getLastXDays(daysInLastMonth)

    console.log(timezone, server, timeframe)

    createChart(formattedTimestamps, averagedPlayercount);
}