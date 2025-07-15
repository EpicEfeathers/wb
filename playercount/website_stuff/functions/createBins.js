function avgOfArray(arr) {
  const filtered = arr.filter(value => value != null)
  if (filtered.length == 0) return null

  const sum = filtered.reduce((sum, count) => sum + count, 0) // 0 is initial value
  return Math.round(sum / filtered.length)
}

export function createBins(timestampsArray, playercountsArray) {
    const bins = {}
    const midnightTimestamps = []

    for (let i = 0; i < timestampsArray.length; i++){
        const date = new Date(timestampsArray[i] * 1000) // timestamps are in seconds, not ms as JS likes

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // months start at 0, hence add 1
        const day = date.getDate().toString().padStart(2, '0');

        const key = `${year}-${month}-${day}` // create key using year-month-day (e.g. 2025-07-15)

        if (!bins[key]) {
            bins[key] = []

            midnightTimestamps.push((new Date(year, Number(month - 1), Number(day)).getTime())) // add to timestamps arr (midnight of current day)
        }

        bins[key].push(playercountsArray[i])
    }

    const playercounts = Object.values(bins).map(avgOfArray)

    return {midnightTimestamps, playercounts}
}