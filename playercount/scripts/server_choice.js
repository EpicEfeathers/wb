const servers = ["Worldwide","ASIA","ASIA_4V4","ASIA_CLAN","AS_BATTLE_ROYALE","AS_DEAD_CITY","AUSTRALIA","AUSTRALIA_CLAN","DEAD_CITY","EUROPE","EUROPE_CLAN","EU_4V4","EU_BATTLE_ROYALE","EU_DEAD_CITY","INDIA","INDIA_CLAN","JAPAN","JAPAN_CLAN","NA_BATTLE_ROYALE","NA_DUO_BETA","RUSSIA","USA","USA_4V4","USA_BETA","USA_CLAN","USA_WEST","USA_WEST_CLAN"];
const serverSelect = document.getElementById("server-select");

export function populateServerChoice() {
    servers.forEach(server => {
        const option = document.createElement("option");
        option.text = server;
    
        serverSelect.appendChild(option);
    })
}