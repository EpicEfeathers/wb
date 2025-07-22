import { fetchData } from './fetchData.js'
import { fetchData, fetchSquadList } from './fetchData.js'
import { displayAllSquadData } from './displayData.js'
import { searchResults } from './searchResults.js'

async function main() {
    const allSquadsData = await fetchData() // waits until there is data

    const squadName = "CAESAR"

    displayAllSquadData(squadName, allSquadsData)

    searchResults(allSquadsData)
    const squadList = await fetchSquadList()
    searchResults(squadList, allSquadsData)
}

main()









// Update Footer Date
document.getElementById("footer").textContent = new Date().getFullYear()