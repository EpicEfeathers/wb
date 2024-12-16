export function displayBarChart(yValues) {
    var xValues = [
      "USA",
      "USA_WEST",
      "ASIA",
      "JAPAN",
      "EUROPE",
      "INDIA",
      "AUSTRALIA",
      "RUSSIA",
    ];
    var barColors = "#999999";
  
    var chart = Chart.getChart("playerCountChart"); // Get the chart instance
  
    if (chart) {
      // Modify the existing chart's dataset
      chart.data.datasets[0].data = yValues; // Update the data
      chart.update(); // Re-render the chart with the new data
    } else {
      new Chart("playerCountChart", {
        type: "bar",
        data: {
          labels: xValues,
          datasets: [
            {
              backgroundColor: barColors,
              data: yValues,
              label: "Player Count",
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: true,
            },
          },
        },
      });
    }
  }