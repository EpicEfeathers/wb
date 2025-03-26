/*export function returnMovingAvg(playercount, binSize) {
    const avgPlayercount = [];
    for (const item of playercount) {
        for (let i = 0; i < item.length; i += binSize) {
            const window = item.slice(i, i+binSize);
                    
            const average = window.reduce((a, b) => a + b) / window.length;
            
            avgPlayercount.push(Math.round(average));
        }
    }

    return avgPlayercount;
}*/
export function returnMovingAvg(playercount) {
    // takes in array full of arrays, returns the average for each array
    const avgPlayercount = [];
    for (const item of playercount) {
        if (item[0] == null) { // check if null value (if do not do this check, takes null list and returns 0)
            avgPlayercount.push(null)
        } else {
            const average = item.map(Number).reduce((a, b) => a + b) / item.length; // changes string to ints first, then averages

      	    avgPlayercount.push(Math.round(average));
        }

    }

    return avgPlayercount;
}

function daysInPreviousMonth() {
    const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0); // setting the day to 0 gives the last day of the previous month

    return lastMonth.getDate(); // turns it into date (day)
}