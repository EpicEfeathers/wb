let myChart = null

export function createChart( {xAxisLabels, hoverLabels, data} ) {

    console.log(xAxisLabels, hoverLabels, data)

    const ctx = document.getElementById("playercount-chart")

    const maxValue = Math.max(...data)
    const yMax = maxValue === 0 ? 10 : maxValue * 1.1 // add 10% padding

    // if chart already exists
    if (myChart) {
        myChart.data.labels = xAxisLabels;
        myChart.data.datasets[0].data = data;
        myChart.options.scales.y.suggestedMax = yMax;
        myChart.update();
    } else {
        myChart = new Chart(ctx, {
            type: 'line',

            data: {
                labels: xAxisLabels,
                datasets: [{
                    label: 'Player Count',
                    data: data,
                    fill: false,
                    tension: 0.1,
                    pointRadius: 0, // remove the dots from the chart
                    pointHitRadius: 10 // distance from the dot a hover popup will show
                }]
            },
            options: {
                scales: {
                    // only show every 2nd tick for x-values
                    x: {
                        ticks: {
                            callback: function (value, index) {
                                // Show every 2nd label (or every Nth)
                                return index % 2 === 0 ? this.getLabelForValue(value) : '';
                            }
                        }
                    },
                    // max and min y values
                    y: {
                        min: 0,
                        //max: yMax
                        suggestedMax: yMax // lets the chart round up based on its own logic, keeping the max value the same step (so if counting by 50 another 50, not 20 e.g.)
                    }
                },

                plugins: {
                    tooltip: {
                        callbacks: {
                        title: function(context) {
                            // Use index to get custom hover label
                            const index = context[0].dataIndex;
                            return hoverLabels[index];
                        }
                        }
                    }
                }
            }
        })
    }
}