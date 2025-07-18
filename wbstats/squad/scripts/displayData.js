export function displayData(squadData) {
    const summaryTemplate = document.getElementById("summary-template") // the template
    const container = document.getElementById("summary-data-container") // main div

    const clone = summaryTemplate.content.cloneNode(true) // copy it so we can use it

    clone.querySelector(".classic-wins").textContent = "5000"

    container.appendChild(clone) // add it to the div
}