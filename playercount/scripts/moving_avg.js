function halfHoursSinceMidnight() {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(0, 0, 0, 0); // Set to today's midnight

    const diffMs = now - midnight; // Difference in milliseconds
    return Math.floor(diffMs / (30 * 60 * 1000)); // Convert to half-hours
}


function fillPlayerCount(playercount, totalDataLength, binSize) {
    const necessaryDataLength = Math.round(totalDataLength / binSize);

    if (playercount.length < necessaryDataLength) {
        let blankData = new Array(necessaryDataLength - playercount.length).fill(null); // fills array with null values so that if chart is missing data, it shows the values as "null" (doesn't show any value at all)

        playercount = blankData.concat(playercount);
    }

    return playercount;
}

export function returnAveragedPlayercount(playercount, totalDataLength, binSize) {
    let resultPlayerCount = [];
  
    for (let i = 0; i < playercount.length; i+= binSize) {
        let window = playercount.slice(i, i+ binSize);
        let average = window.reduce((sum, value) => sum + value, 0) / binSize; // 0 initial value of sum

        console.log(JSON.stringify(window))
      
        resultPlayerCount.push(Math.round(average));
    }

    resultPlayerCount = fillPlayerCount(resultPlayerCount, totalDataLength, binSize)
    console.log(JSON.stringify(resultPlayerCount))

    return resultPlayerCount;
}


export function returnTimestamps(timestamps, binSize) {
    let resultTimestamps = []
  
    for (let i = 0; i < timestamps.length; i+= binSize) {
        let window = timestamps.slice(i, i+ binSize);
      
        resultTimestamps.push(window[window.length - 1]);
    }

    console.log(JSON.stringify(resultTimestamps))

    return resultTimestamps;
}  