import { fetchData, fetchSquadList } from './fetchData.js'
import { displayAllSquadData } from './displayData.js'
import { searchResults } from './searchResults.js'
import { addTooltips } from './addTooltips.js'

async function main(squadName) {
    const allSquadsData = await fetchData() // waits until there is data
    const squadList = fetchSquadList(allSquadsData)

    displayAllSquadData(squadName, allSquadsData, squadList)

    addTooltips()

    document.body.classList.add('ready'); /* Show data */

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