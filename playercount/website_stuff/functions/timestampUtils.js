export function roundToNearestHalfHour(timestamp) {
    if (String(timestamp).length == 13) { // if timestamp in ms
        timestamp = timestamp / 1000 // convert to sec timestamp
    }
    const halfHour = 30 * 60 // 60 sec * 30 mins
    const nearestHalfHour = Math.floor(timestamp / halfHour) * halfHour // get most recent half hour timestamp

    return nearestHalfHour
}

export function formatDailyTimestamps(timestamp) {
    const now = new Date(timestamp * 1000) // js timestamps in ms

    const localTime = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    }).format(now)

    return localTime
}


export function formatYearlyTimestamps(timestamp) {
    const now = new Date(timestamp * 1000) // js timestamps are in ms

    const shortenedLocalTime = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric'
    }).format(now)


    // must split it into 2 parts to be joined by "at" (dumb but ok)
    const date = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',

    }).format(now)
    const time = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    }).format(now)
    //const verboseLocalTime = `${date} at ${time}`
    const verboseLocalTime = timestamp

    return { shortenedLocalTime, verboseLocalTime }
}