export async function fetchPlayerData() {
    try {
        //const response = await fetch('../../data/squad_data.json')
        const response = await fetch('https://wbapi.wbpjs.com/players/getPlayer?uid=609aa68ed142afe952202c5c')
        if (!response.ok) throw new Error("Failed to load JSON")

        const data = await response.json()
        return data
    } catch {
        print("Error loading JSON: ", error)
    }
}