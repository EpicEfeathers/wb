const first_time = 1741129200


export function formatDailyTimestamp(timestamps, utcOffset) {
    const hour_timestamps = []

    for (let timestamp of timestamps) {
        timestamp = timestamp * 60 * 30 + first_time; // convert it to unix timestamp
        timestamp = timestamp * 1000; // convert to ms

        const adjustedTimestamp = timestamp + utcOffset * 3600000; // Adjust timestamp based on UTC offset
    
        const date = new Date(adjustedTimestamp);
    
        const hour = date.getUTCHours(); // keeps time in bounds of (0-23)
        let minutes = date.getUTCMinutes();
    
        if (minutes < 10) {
            minutes = "0" + minutes
        }
    
        hour_timestamps.push(`${hour}:${minutes}`)
    }
    
    return hour_timestamps
}


export function formatWeeklyTimestamp(timestamps, utcOffset) {
    const weekly_timestamps = []

    for (let timestamp of timestamps) {
        timestamp = timestamp * 60 * 30 + first_time; // convert it to unix timestamp
        timestamp = timestamp * 1000; // convert to ms

        const adjustedTimestamp = timestamp + utcOffset * 3600000; // Adjust timestamp based on UTC offset
    
        const date = new Date(adjustedTimestamp);

        const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        const day = days[date.getUTCDay()];
        const hour = date.getUTCHours(); // keeps time in bounds of (0-23)
        let minutes = date.getUTCMinutes();

        if (minutes < 10) {
            minutes = "0" + minutes
        }
    
        weekly_timestamps.push(`${day} ${hour}:${minutes}`)
    }
    
    return weekly_timestamps
}

export function formatMonthlyTimestamp(timestamps, utcOffset) {
    const monthly_timestamps = []

    for (let timestamp of timestamps) {
        timestamp = timestamp * 60 * 30 + first_time; // convert it to unix timestamp
        timestamp = timestamp * 1000; // convert to ms

        const adjustedTimestamp = timestamp + utcOffset * 3600000; // Adjust timestamp based on UTC offset
    
        const date = new Date(adjustedTimestamp);

        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const month = months[date.getUTCMonth()];

        const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        const day = date.getUTCDate();

        const hour = date.getUTCHours(); // keeps time in bounds of (0-23)
        let minutes = date.getUTCMinutes();

        if (minutes < 10) {
            minutes = "0" + minutes
        }
    
    
        monthly_timestamps.push(`${month} ${day} ${hour}:${minutes}`)
    }
    
    return monthly_timestamps
}
