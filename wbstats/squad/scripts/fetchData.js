export async function fetchData() {
    try {
        const response = await fetch('../../data/squad_data.json')
        if (!response.ok) throw new Error("Failed to load JSON")

        const data = await response.json()
        return data
    } catch {
        print("Error loading JSON: ", error)
    }
}