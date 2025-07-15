let myChart = null

function calculateMaxValue(data) {
    const maxValue = Math.max(...data) // '...' spreads array into individual elements
    const yMax = maxValue === 0 ? 10 : maxValue * 1.1 // add 10% padding

    return yMax
}

export function createChart( {xAxisLabels, hoverLabels, data} ) {
    const scatterData = xAxisLabels.map((label, i) => ({
        x: label,
        y: data[i]
        }));
    const ctx = document.getElementById("playercount-chart")

    const yMax = calculateMaxValue(data)


    // if chart already exists
    if (myChart) {
        myChart.data.labels = xAxisLabels;
        myChart.data.datasets[0].data = data;
        myChart.options.scales.y.suggestedMax = yMax;
        myChart.update();
    } else {
        myChart = new Chart(ctx, {
            /*type: 'line',

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
            },*/
            type: 'scatter', // 🎯 scatter plot!
            data: {
                datasets: [{
                label: 'Player Count',
                data: scatterData, // array of { x: <date>, y: <value> }
                showLine: false, // disable line connection between points
                pointRadius: 3,
                pointHoverRadius: 6,
                }]
            },
            options: {
                scales: {
                    // only show every 2nd tick for x-values
                    x: {
                        /*ticks: {
                            callback: function (value, index) {
                                // Show every 2nd label (or every Nth)
                                return index % 2 === 0 ? this.getLabelForValue(value) : '';
                            }
                        }*/
                        type: 'time',
                        time: {
                            unit: 'day', // or 'week', 'month' depending on bin size
                            tooltipFormat: 'MMM d, yyyy',
                            displayFormats: {
                                day: 'MMM d',
                                week: 'MMM d',
                                month: 'MMM yyyy'
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

                /*plugins: {
                    tooltip: {
                        callbacks: {
                        title: function(context) {
                            // Use index to get custom hover label
                            const index = context[0].dataIndex;
                            return hoverLabels[index];
                        }
                        }
                    }
                }*/
            }
        })
    }
}