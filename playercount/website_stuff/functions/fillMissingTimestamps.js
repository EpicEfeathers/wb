function getServerData(row, index) {
    // get server data based on index
    if (index == -1) {
        const data = row.slice(1) // remove timestamp info
        const worldwidePlayercount = data.reduce((accumulator, current) => accumulator + Number(current), 0) // sums values
        return worldwidePlayercount
    } else {
        return row[index]
    }
}

export function fillMissingTimestamps(data, totalPoints, serverName, header) {
    const knownTimestamps = data.map(row => row[0])

    let index = -1 // default to -1 which is worldwide data
    if (serverName != "WORLDWIDE") {
        index = header.indexOf(serverName)
    }

    const now = new Date() / 1000 // js timestamp is in ms
    const halfHour = 30 * 60 // 60 sec * 30 mins
    const nearestHalfHour = Math.floor(now / halfHour) * halfHour // get most recent half hour timestamp

    // build list of expected timestamps
    const expectedTimestamps = []

    for (let i = (totalPoints - 1); i >= 0; i --) {
        expectedTimestamps.push(String(nearestHalfHour - (i * halfHour)))
    }


    const playercounts = []
    for (let timestamp of expectedTimestamps) {
        if (knownTimestamps.includes(timestamp)) {
            const timestampIndex = knownTimestamps.indexOf(timestamp)
            playercounts.push(getServerData(data[timestampIndex], index))
        } else {
            playercounts.push(null)
        }
    }
    return playercounts
}