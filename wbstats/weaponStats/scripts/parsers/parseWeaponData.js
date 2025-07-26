import { WEAPON_NAMES } from "../../../constants.js";
import { formatLargeNumber } from "./utils.js";

function totalShotsFiredPerWeapon(shotsFiredZoomedPerWeapon, shotsFiredUnzoomedPerWeapon) {
    const combined = { ...shotsFiredZoomedPerWeapon } // copy
    
    for (const [key, value] of Object.entries(shotsFiredUnzoomedPerWeapon)) {
        if (combined[key] !== undefined) { // if not a new key
            combined[key] += value
        } else {
            combined[key] = value
        }
    }

    return combined
}

export function parseWeaponData(playerData) {
    const killsPerWeapon = playerData.kills_per_weapon ?? {}
    const deathsPerWeapon = playerData.deaths ?? {}
    const headshotsPerWeapon = playerData.headshots ?? {}
    const shotsFiredZoomedPerWeapon = playerData.shots_fired_zoomed ?? {}
    const shotsFiredUnzoomedPerWeapon = playerData.shots_fired_unzoomed ?? {}
    const shotsHitZoomedPerWeapon = playerData.shots_hit_zoomed ?? {}
    const shotsHitUnzoomedPerWeapon = playerData.shots_hit_unzoomed ?? {}

    const shotsFiredPerWeapon = totalShotsFiredPerWeapon(shotsFiredZoomedPerWeapon, shotsFiredUnzoomedPerWeapon)

    const weaponRows = []

    for (const weapon in WEAPON_NAMES) {
        const weaponKills = killsPerWeapon[weapon] ?? 0
        const weaponDeaths = deathsPerWeapon[weapon] ?? 0
        const killsPerDeath = weaponDeaths > 0 ? (weaponKills / weaponDeaths).toFixed(1) : 0.0 // check denominator != 0

        const shotsFiredZoomed = shotsFiredZoomedPerWeapon[weapon] ?? 0
        const shotsFiredUnzoomed = shotsFiredUnzoomedPerWeapon[weapon] ?? 0
        const shotsHitZoomed = shotsHitZoomedPerWeapon[weapon] ?? 0
        const shotsHitUnzoomed = shotsHitUnzoomedPerWeapon[weapon] ?? 0
        const shotsFired = shotsFiredPerWeapon[weapon] ?? 0

        const headshots = headshotsPerWeapon[weapon] ?? 0
        const headshotPercentage = shotsFired > 0 ? ((headshots / shotsFired) * 100).toFixed(1) : 0.0 // check denominator != 0

        const weaponAccuracyZoomed = shotsFiredZoomed > 0 ? ((shotsHitZoomed / shotsFiredZoomed) * 100).toFixed(1) : 0.0 // check denominator != 0
        const weaponAccuracyUnzoomed = shotsFiredUnzoomed > 0 ? ((shotsHitUnzoomed / shotsFiredUnzoomed) * 100).toFixed(1) : 0.0 // check denominator != 0

        weaponRows.push({
            id: weapon,
            name: WEAPON_NAMES[weapon],
            kills: weaponKills,
            deaths: weaponDeaths,
            killsPerDeath: Number(killsPerDeath),
            headshotPercentage: Number(headshotPercentage),
            accuracyZoomed: Number(weaponAccuracyZoomed),
            accuracyUnzoomed: Number(weaponAccuracyUnzoomed)
        })

    }
    return weaponRows
}

export function renderRows(weaponRows) {
    const rowTemplate = document.getElementById("weapon-row-template")
    const tableBody = document.querySelector("#weapon-stats-table tbody") 

    tableBody.innerHTML = "" // clear body

    for (const weapon of weaponRows) {
        const clone = rowTemplate.content.cloneNode(true)

        clone.querySelector(".weapon-name").textContent = weapon.name
        clone.querySelector(".weapon-kills").textContent = formatLargeNumber(weapon.kills)
        clone.querySelector(".weapon-deaths").textContent = formatLargeNumber(weapon.deaths)
        clone.querySelector(".weapon-kd").textContent = weapon.killsPerDeath
        clone.querySelector(".weapon-hs-percentage").textContent = `${weapon.headshotPercentage}%`
        clone.querySelector(".weapon-accuracy-zoomed").textContent = `${weapon.accuracyZoomed}%`
        clone.querySelector(".weapon-accuracy-unzoomed").textContent = `${weapon.accuracyUnzoomed}%`
        

        tableBody.appendChild(clone) // add it to the div
    }
}

let currentSortKey = "kills" // start sorting by kills
let sortAscending = true

export function sort(th, weaponRows) {
    const sortKey = th.dataset.sortKey;

    if (sortKey == currentSortKey) { // if clicked again on the current column
        sortAscending = !sortAscending // toggle sort descending / ascending
    } else {
        currentSortKey = sortKey
        sortAscending = false
    }

    weaponRows.sort((a, b) => {
        const valueA = a[sortKey]
        const valueB = b[sortKey]

        if ((typeof valueA === "string") && (typeof valueB === "string")) { // if organizing alphabetically
            return sortAscending
                ? valueA.localeCompare(valueB)
                : valueB.localeCompare(valueA)
        }
        return sortAscending 
            ? a[sortKey] - b[sortKey] 
            : b[sortKey] - a[sortKey]
    })

    renderRows(weaponRows)

    // Remove arrow classes from all headers
    document.querySelectorAll('th.sortable').forEach(header => {
        header.classList.remove('sorted-asc', 'sorted-desc');
        header.querySelector('.sort-arrow').textContent = '';
    });

    // Add arrow class and symbol to the sorted header
    if (sortAscending) {
        th.classList.add('sorted-asc');
        th.querySelector('.sort-arrow').textContent = '▲';  // up arrow
    } else {
        th.classList.add('sorted-desc');
        th.querySelector('.sort-arrow').textContent = '▼';  // down arrow
    }
}

export function sortByHeader(weaponRows) {
    document.querySelectorAll("th.sortable").forEach(th => {
        th.addEventListener("click", () => {
            sort(th, weaponRows)
        })
    })
}