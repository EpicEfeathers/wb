export function createChart(timestamps, playercount) {
    var chart = Chart.getChart("playerCountChart"); // Get the chart instance

    if (chart) { // checks whether chart exists to update or create new chart
        chart.data.labels = timestamps;
        chart.data.datasets[0].data = playercount;

        chart.update();
    } else {
        new Chart("playerCountChart", {
            type: 'line',  // Change this to 'line' for a line chart
            data: {
                labels: timestamps, // x-axis labels
                datasets: [{
                    label: 'Player Count',  // Dataset label
                    data: playercount,  // Data points for the line plot
                    borderColor: 'rgba(75, 192, 192, 1)',  // Line color
                    //backgroundColor: 'rgba(75, 192, 192, 0.2)',  // Area under the line color
                    tension: 0.1  // Smoothing of the line, adjust for curves
                }]
            },
            options: {
                responsive: true,  // Makes the chart responsive to window size
                scales: {
                    y: {
                        beginAtZero: true,  // Ensure the y-axis starts at 0
                        ticks: {
                            stepSize: 1,  // Set the interval between tick marks to 1 (integer values)
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            title: function (tooltipItems) {
                                return tooltipItems[0].label; // Append " EST" to tooltip label
                            }
                        }
                    }
                },
            }
        });
    }
}