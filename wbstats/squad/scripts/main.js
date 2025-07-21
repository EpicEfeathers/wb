import { fetchData } from './fetchData.js'
import { displaySummaryData, displayUserData } from './displayData.js'

async function main() {
    const allSquadsData = await fetchData() // waits until there is data
    const squadName = "$$$"

    const squadData = allSquadsData[squadName]

    displaySummaryData(squadData)

    const squadMembers = squadData.members ?? []
    squadMembers.sort((a, b) => b.last_seen - a.last_seen)
    for (const index in squadMembers) {
        displayUserData(squadMembers[index])
    }
}

main()










// Update Footer Date
document.getElementById("footer").textContent = new Date().getFullYear()