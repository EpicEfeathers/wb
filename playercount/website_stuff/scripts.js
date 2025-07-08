import { parseData } from './timeframes/daily.js'
import { monitorServerDropdown, populateServerDropdown } from './functions/dropdownUtils.js'
import { splitRows } from './functions/parseCSVData.js'

async function getPlayercountData() {
    const response = await fetch('https://raw.githubusercontent.com/EpicEfeathers/wb/refs/heads/main/data/playercount.csv')
    if (!response.ok) {
        console.log("Error fetching data")
        return null
    }
    return await response.text()
}

const defaultServer = 'WORLDWIDE'
getPlayercountData().then(csvData => {
    if (csvData) {
        const { data, header } = splitRows(csvData)

        populateServerDropdown(header, defaultServer)
        monitorServerDropdown(data, header)

        parseData(data, header, defaultServer)
    }
})