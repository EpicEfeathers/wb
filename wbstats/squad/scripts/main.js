import { fetchData, fetchSquadList } from './fetchData.js'
import { displayAllSquadData } from './displayData.js'
import { searchResults } from './searchResults.js'

async function main(squadName) {
    const allSquadsData = await fetchData() // waits until there is data

    displayAllSquadData(squadName, allSquadsData)


    const squadList = await fetchSquadList()

    searchResults(squadList, allSquadsData)
}

// When window loads
window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search)
    const squadName = params.get('squad')  // gets the value of ?squad=

    main(squadName)
});









// Update Footer Date
document.getElementById("footer").textContent = new Date().getFullYear()