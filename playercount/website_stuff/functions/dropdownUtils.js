import { parseData } from '../timeframes/daily.js'

export function populateServerDropdown(header, defaultValue) {
    const servers = header.slice(1) // remove "Timestamp" as not valid server choice

    const dropdown = document.getElementById('server-dropdown')

    servers.forEach(serverText => {
        const server = document.createElement('option')
        server.textContent = serverText
        dropdown.appendChild(server)
    });
    dropdown.value = defaultValue
}

export function monitorServerDropdown(data, header) {
    const dropdown = document.getElementById('server-dropdown');

    dropdown.addEventListener('change', (event) => {
        let selectedServer = event.target.value;
        parseData(data, header, selectedServer)
        // You can run any other code here based on the selection
    });
}