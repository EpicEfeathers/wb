document.getElementById("fetchData").addEventListener('click', () => {
    console.log("click");
    const apiUrl = 'https://wbapi.wbpjs.com/status/serverList?region=USA';
    fetch(apiUrl) // fetches data from site
        .then(response => {
            if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const dataContainer = document.getElementById('data');
            dataContainer.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
          })
        .catch(error => {
            console.error(error);
            document.getElementById('data').innerText = 'Failed to fetch data.';
        });
})