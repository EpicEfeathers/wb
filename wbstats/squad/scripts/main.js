import { fetchData } from './fetchData.js'
import { displayData } from './displayData.js'

async function main() {
    const allSquadsData = await fetchData() // waits until there is data
    const squadName = "$$$"

    const squadData = allSquadsData[squadName]
    console.log(squadData)

    displayData(squadData)
}

main()










// Update Footer Date
document.getElementById("footer").textContent = new Date().getFullYear()