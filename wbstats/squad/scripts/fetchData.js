export async function fetchData() {
    try {
        //const response = await fetch('../../data/squad_data.json')
        const response = await fetch('https://raw.githubusercontent.com/EpicEfeathers/wb/refs/heads/main/data/squad_data.json')
        if (!response.ok) throw new Error("Failed to load JSON")

        const data = await response.json()
        return data
    } catch {
        print("Error loading JSON: ", error)
    }
}

export async function fetchSquadList() {
    try {
        const response = await fetch('https://wbapi.wbpjs.com/squad/getSquadList')
        if (!response.ok) throw new Error("Failed to load squad list")
        
        const data = await response.json()
        return data
    } catch {
        print("Error loading squad list: ", error)
    }
}