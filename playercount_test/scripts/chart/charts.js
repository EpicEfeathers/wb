export function createChart(timestamps, playercount) {

    const chart = Chart.getChart("playerCountChart");

    if (chart) { // checks whether chart exists to update or create new chart
        chart.data.labels = timestamps;
        chart.data.datasets[0].data = playercount;

        chart.update();
    } else {
        new Chart("playerCountChart", {
            type: 'line',
            data: {
                labels: timestamps, // x-axis labels
                datasets: [{
                    label: 'Player Count',
                    data: playercount, 
                    borderColor: 'rgba(75, 192, 192, 1)',  // line color
                    //backgroundColor: 'rgba(75, 192, 192, 0.2)',  // area under the line color
                    tension: 0.1,  // smoothes line (0 = none, 1 = way too much)
                    pointRadius: 2,
                }]
            },
            options: {
                responsive: true,  // responsive to window size
                scales: {
                    y: {
                            beginAtZero: true,  // y-axis starts at 0
                            /*ticks: {
                                stepSize: 1,  // Set the interval between tick marks to 1 (integer values)
                            },*/
                        }
                },
                plugins: {
                    tooltip: {
                        intersect: false, // this allows tooltips to trigger on the line, not just the points
                        yAlign: 'bottom',  // align the tooltip vertically to the top of the point
                        axis: 'x'
                    }
                },
            }
        });
    }
}