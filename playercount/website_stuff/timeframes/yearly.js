import { roundToNearestHalfHour, formatYearlyTimestamps } from '../functions/timestampUtils.js'
import { createChart } from '../functions/chartUtils.js'
import { createBins } from '../functions/createBins.js'


function getTimestampOneYearAgo() {
    const now = new Date()
    const oneYearAgo = new Date(now) // copy it and do math
    oneYearAgo.setFullYear(now.getFullYear() - 1)

    return roundToNearestHalfHour(oneYearAgo.getTime())
}

function makeTimestampMap(data) {
    // maps each timestamp to an array for efficient lookups
    const map = new Map()
    for (const row of data) {
        map.set(Number(row[0]), row.slice(1)) // row[0] is the timestamp, the rest is player data
    }
    return map
}

function timestampsFromPastYear(lastYearTimestamp, currentTimestamp) {
    const timestampsFromPastYear = []
    let timestamp = lastYearTimestamp
    while (timestamp <= currentTimestamp) {
        timestampsFromPastYear.push(timestamp)

        timestamp += 60*30 // add the 1800 seconds
    }

    return timestampsFromPastYear
}

function getPlayercountFromTimestamp( { map, timestamp, serverIndex } ) {
    const playercounts = map.get(timestamp)

    if (!playercounts) return null // if no matching timestamp (missing data)


    if (serverIndex == -1) { // if WORLDWIDE data
        return playercounts.reduce((sum, count) => sum + Number(count), 0) // sums values
    }
    return playercounts[serverIndex]
}

export function yearly( {data, header, selectedServer} ) {
    const map = makeTimestampMap(data)

    let index = -1 // default to -1 which is worldwide data
    if (selectedServer != "WORLDWIDE") {
        index = header.indexOf(selectedServer)
    }

    const lastYear = getTimestampOneYearAgo()
    const now = roundToNearestHalfHour(Date.now())
    const timestamps = timestampsFromPastYear(lastYear, now)

    const playercountArray = []
    for (const timestamp of timestamps) {
        playercountArray.push(getPlayercountFromTimestamp({
            map: map, 
            timestamp: timestamp, 
            serverIndex: index
        }))
    }

    const { midnightTimestamps, playercounts} = createBins(timestamps, playercountArray)

    createChart({
        xAxisLabels: midnightTimestamps, 
        hoverLabels: midnightTimestamps, 
        data: playercounts
    })
}