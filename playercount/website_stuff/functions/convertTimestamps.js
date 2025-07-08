export function formatTimestamps(timestamp) {
    const now = new Date(timestamp * 1000) // js timestamps in ms

    const localTime = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    }).format(now)

    return localTime
}