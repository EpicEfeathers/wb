const firstTime = 1741129200;

export function timestampToDatetime(halfHourTimestamp) {
	const actualTimestamp = halfHourTimestamp * 60 * 30 + firstTime;
	
    return actualTimestamp * 1000;
}


export function checkIfMidnight(timestamp) {
	const date = new Date(timestamp);
    return date.getHours() === 0 && date.getMinutes() === 0 && date.getSeconds() === 0;
}



export function formatTimestampsForChart(timestampArray) {
    const updatedTimestampsArray = []
    for (const timestamp of timestampArray) {
        const date = new Date(timestamp);
        const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date); // returns name of month

        updatedTimestampsArray.push(`${monthName} ${date.getDate()}`)
    };
    return updatedTimestampsArray;
}