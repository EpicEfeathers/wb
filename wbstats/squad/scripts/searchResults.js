export function searchResults(squadList, allSquadsData) {
    const input = document.querySelector(".squad-search-bar")
    const results = document.querySelector(".search-results")
    const container = document.querySelector(".search-container") // Used to detect when user clicks off search bar

    function updateResults() {
        const query = input.value.toLowerCase().trim()
        results.innerHTML = ""

        if (query == "") return

        const matches = squadList.filter( name => name.toLowerCase().includes(query.toLowerCase()))

        if (matches.length == 0) {
            results.innerHTML = "<div>No results...</div"
            return
        }

        matches.forEach(match => {
            const div = document.createElement("div")
            div.textContent = match
            div.addEventListener("click", () => {
                input.value = match
                results.innerHTML = ""

                window.location.href = `?squad=${encodeURIComponent(match)}`;
            })
            results.appendChild(div)
        })
    }

    // Detect any key press (so showing popup results)
    input.addEventListener("input", updateResults)

    // Detect when focused (so if user clicks off then back, show results)
    input.addEventListener("focus", updateResults)

    // Hide results on click off
    document.addEventListener("click", (e) => {
        if (!container.contains(e.target)) {
            results.innerHTML = "";
        }
    });
}