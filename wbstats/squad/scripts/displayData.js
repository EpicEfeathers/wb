import { formatLargeNumber, formatTimestamp } from './utils.js'

export function displaySummaryData(squadData) {
    const summaryTemplate = document.getElementById("summary-template") // the template
    const container = document.getElementById("summary-data-container") // main div

    const clone = summaryTemplate.content.cloneNode(true) // copy it so we can use it

    clone.querySelector(".squad-name").textContent = squadData.squad_name ?? ""

    const squadMemberCount = squadData.members.length ?? 0
    clone.querySelector(".member-count-label").textContent = `${squadMemberCount === 1 ? "member" : "members"}` // member vs memberS`
    clone.querySelector(".member-count").textContent = squadMemberCount

    const classicWins = Object.values(squadData.classic_wins) ?? 0
    const summedClassicWins = classicWins.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    clone.querySelector(".classic-wins").textContent = formatLargeNumber(summedClassicWins)

    clone.querySelector(".br-wins").textContent = formatLargeNumber(squadData.br_wins ?? 0)
    clone.querySelector(".total-kills").textContent = formatLargeNumber(squadData.kills ?? 0)
    clone.querySelector(".total-deaths").textContent = formatLargeNumber(squadData.deaths ?? 0)
    clone.querySelector(".squad-kdr").textContent = squadData.kdr ?? ""
    clone.querySelector(".avg-level").textContent = squadData.avg_level ?? ""
    clone.querySelector(".avg-kelo").textContent = squadData.avg_kills_elo ?? ""
    clone.querySelector(".avg-gelo").textContent = squadData.avg_games_elo ?? ""
    clone.querySelector(".seen-recently").textContent = squadData.seen_recently ?? 0

    container.appendChild(clone) // add it to the div
}


export function displayUserData(userData) {
    const summaryTemplate = document.getElementById("user-template") // the template
    const container = document.getElementById("user-data-container") // main div

    const clone = summaryTemplate.content.cloneNode(true) // copy it so we can use it

    clone.querySelector(".username").textContent = userData.name ?? ""
    clone.querySelector(".last-seen").textContent = formatTimestamp(userData.last_seen ?? 0)

    clone.querySelector(".level").textContent = formatLargeNumber(userData.level ?? 0)
    clone.querySelector(".kills").textContent = formatLargeNumber(userData.kills ?? 0)
    clone.querySelector(".deaths").textContent = formatLargeNumber(userData.deaths ?? 0)
    clone.querySelector(".kdr").textContent = ((userData.kills ?? 0) / (userData.deaths ?? 0)).toFixed(1)

    const classicWins = Object.values(userData.classic_wins) ?? 0
    const summedClassicWins = classicWins.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    clone.querySelector(".classic-wins").textContent = formatLargeNumber(summedClassicWins)

    clone.querySelector(".br-wins").textContent = formatLargeNumber(userData.br_wins ?? "")
    clone.querySelector(".kelo").textContent = userData.kills_elo ?? ""
    clone.querySelector(".gelo").textContent = userData.games_elo ?? ""
    clone.querySelector(".coins").textContent = formatLargeNumber(userData.coins ?? 0)

    container.appendChild(clone) // add it to the div
}

function display404Error(squadName) {
    const summaryTemplate = document.getElementById("not-found-template") // the template
    const container = document.getElementById("404-not-found-container") // main div

    const clone = summaryTemplate.content.cloneNode(true) // copy it so we can use it

    clone.querySelector(".not-found-squad-name").textContent = squadName

    container.appendChild(clone)
}

function displaySquadList(squadList) {
    const listTemplate = document.getElementById("squad-list-template") // outer template
    const squadCardTemplate = document.getElementById("squad-card-template") // inner template

    const container = document.getElementById("squad-list-container") // main div

    const listClone = listTemplate.content.cloneNode(true) // copy it so can use it
    const listContainer = listClone.querySelector(".squad-list")

    for (const squad of squadList) {
        const squadCardClone = squadCardTemplate.content.cloneNode(true)
        const link = squadCardClone.querySelector("a.squad-card")

        link.href = `?squad=${encodeURIComponent(squad)}`;

        squadCardClone.querySelector(".squad-card-name").textContent = squad

        listContainer.appendChild(squadCardClone)
    }
    container.appendChild(listClone)
}

export function displayAllSquadData(squadName, allSquadsData, squadList) {
    if (squadName == "" || squadName === null) {
        displaySquadList(squadList)
        document.title = `Squads`
        return
    } else {
        console.log(squadName, typeof(squadName))
    }
    const doesSquadExist = (squadName in allSquadsData)
    if (!doesSquadExist) {
        display404Error(squadName)
        document.title = `404 Squad "${squadName}" does not exist.`
        return
    }
        
    const squadData = allSquadsData[squadName]
    displaySummaryData(squadData)

    const squadMembers = squadData.members ?? []
    squadMembers.sort((a, b) => b.last_seen - a.last_seen)
    for (const index in squadMembers) {
        displayUserData(squadMembers[index])
    }

    document.title = `Squad [${squadName}]`
}