let myChart = null

// so the chart's values look nice
function roundToMultiple(num, multiple) {
    return Math.ceil(num / multiple) * multiple
}

export function createChart(labels, data) {

    const ctx = document.getElementById("playercount-chart")

    const maxValue = Math.max(...data);
    const yMax = maxValue === 0 ? 10 : roundToMultiple(maxValue * 1.05, 10); // add 10% padding

    // if chart already exists
    if (myChart) {
        myChart.data.labels = labels;
        myChart.data.datasets[0].data = data;
        myChart.options.scales.y.max = yMax;
        myChart.update();
    } else {
        myChart = new Chart(ctx, {
            type: 'line',

            data: {
                labels: labels,
                datasets: [{
                    label: 'Player Count',
                    data: data,
                    fill: false,
                    tension: 0.1,
                    pointRadius: 0, // remove the dots from the chart
                    pointHitRadius: 10 // distance from the dot a hover popup will show
                }]
            },
            // only show every 2nd tick for x-values
            options: {
                scales: {
                    x: {
                        ticks: {
                            callback: function (value, index) {
                                // Show every 2nd label (or every Nth)
                                return index % 2 === 0 ? this.getLabelForValue(value) : '';
                            }
                        }
                    },
                    y: {
                        min: 0,
                        //max: yMax
                        suggestedMax: yMax // lets the chart round up based on its own logic, keeping the max value the same step (so if counting by 50 another 50, not 20 e.g.)
                    }
                }
            }
        })
    }
}