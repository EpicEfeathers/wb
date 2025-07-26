import { fetchPlayerData } from "./fetchData.js";
import { parseWeaponData, sortByHeader, sort } from "./parsers/parseWeaponData.js";
import { setupButtons } from "./buttons.js";

async function main() {
    const playerData = await fetchPlayerData()
    
    const weaponRows = parseWeaponData(playerData)

    // Find the <th> element to sort by initially (kills):
    const initialTh = document.querySelector('th[data-sort-key="kills"]')

    sort(initialTh, weaponRows)
    sortByHeader(weaponRows)

    setupButtons();


    document.body.classList.add('ready') /* Show data */
}

// When window loads
window.addEventListener('DOMContentLoaded', () => {
    main()
})


// Update Footer Date
document.getElementById("footer").textContent = new Date().getFullYear()