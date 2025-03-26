export function createChart(timestamps, playercount, timestamps_num, chartType, rawData) {
    /*if (playercount.length < timestamps_num) {
        // check if array is long enough (want to fill blank values with null values)
        console.log(`Um... ${timestamps_num} ${playercount.length}`)
        let blankData = new Array(timestamps_num - playercount.length).fill(null); // fills array with null values so that if chart is missing data, it shows the values as "null" (doesn't show any value at all)

        playercount = blankData.concat(playercount)
    }

    function getEveryNthItem(array, n) {
        return array.filter((_, index) => index % n === 0);
    }*/

    var chart = Chart.getChart("playerCountChart"); // Get the chart instance

    let skipValue = 1; // don't skip any values
    /*if (rawData) {
        if (chartType == "daily") {
            skipValue = 2;
        } else if (chartType == "weekly") {
            const n = 4 // 1-4 work well
            skipValue = Math.round((336/(2*7))/n)
            //skipValue = 8;
            playercount = getEveryNthItem(playercount, n);
            timestamps = getEveryNthItem(timestamps, n);
        } else {
            const n = 8; // 1, 2, 3, 4, 8, 12 work well
            skipValue = 48/n;
            playercount = getEveryNthItem(playercount, n);
            timestamps = getEveryNthItem(timestamps, n);
        }
        console.log(`Skipvalue1: ${skipValue}`);
    }*/

    if (chart) { // checks whether chart exists to update or create new chart
        chart.data.labels = timestamps;
        chart.data.datasets[0].data = playercount;

        chart.options.scales.x.ticks.callback = function(val, index) {
            // Skip ticks according to skipValue
            return index % skipValue === 0 ? this.getLabelForValue(val) : '';
        };

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
                    tension: 0.1,  // Smoothing of the line, adjust for curves
                    pointRadius: 0, // Remove the dots
                }]
            },
            options: {
                responsive: true,  // Makes the chart responsive to window size
                scales: {
                    x: {
                        ticks: {
                            autoSkip: false,
                            callback: function(val, index) {
                                // Only show every Xth tick label
                                return index % skipValue === 0 ? this.getLabelForValue(val) : '';
                            },
                        }
                    },
                    y: {
                        beginAtZero: true,  // Ensure the y-axis starts at 0
                        ticks: {
                            stepSize: 1,  // Set the interval between tick marks to 1 (integer values)
                        },
                    }
                },
                plugins: {
                    tooltip: {
                        intersect: false, // This allows tooltips to trigger on the line, not just the points
                        mode: 'nearest',  // Tooltips will show for the nearest data point on the line
                        axis: 'x',        // This makes the tooltip trigger when hovering near the x-axis
                    }
                },
                hover: {
                    mode: 'nearest',  // Hover will work on the nearest element (not just a point)
                    intersect: false, // Tooltips will show when hovering anywhere on the line
                },
            }
        });
    }
}