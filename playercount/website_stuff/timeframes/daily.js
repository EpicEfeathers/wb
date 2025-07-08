import { formatTimestamps } from '../functions/convertTimestamps.js'
import { createChart } from '../functions/chartUtils.js'
import { fillMissingTimestamps } from '../functions/fillMissingTimestamps.js'

export function parseData(data, header, selectedServer) {
    // get last 48 values (24 hours)
    const dailyData = data.slice(-48)

    const timestamps = dailyData.map(row => formatTimestamps(row[0])) // get timestamps & format them

    const values = fillMissingTimestamps(dailyData, 48, selectedServer, header) // fills missing timestamps (if needed) and returns proper values

    createChart(timestamps, values)
}