export function formatLargeNumber(num) {
    return new Intl.NumberFormat().format(num);
}

export function formatTimestamp(timestamp) {
    timestamp *= 1000 // convert to ms
    const now = new Date()
    const timestampDate = new Date(timestamp)

    // time ago
    const diffSec = Math.floor((now - timestampDate) / 1000)
    const diffMin = Math.floor(diffSec / 60)
    const diffHours = Math.floor(diffMin / 60)
    const diffDays = Math.floor(diffHours / 24)

    const formattedDate = timestampDate.toLocaleDateString(undefined, { // <- pick locale automatically based on user's locale
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    })

    const formattedTime = timestampDate.toLocaleTimeString(undefined, {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
    })

    // relative time
    let relativeTime = ""

    if (diffSec < 60) {
        relativeTime = `${diffSec} second${diffSec == 1 ? "" : "s"}`
    } else if (diffMin < 60) {
        relativeTime = `${diffMin} minute${diffMin == 1 ? "" : "s"}`
    } else if (diffHours < 24) {
        relativeTime = `${diffHours} hour${diffHours == 1 ? "" : "s"}`
    } else {
        relativeTime = `${diffDays} day${diffDays == 1 ? "" : "s"}`
    }

    //return `${formattedDate} at ${formattedTime}`
    return `${relativeTime} ago`
}