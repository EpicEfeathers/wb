function getAspectRatio() {
  console.log(window.innerWidth);
  if (window.innerWidth < 600) {  // Mobile screens
    return 1; // 1:1 aspect ratio (square)
  } else {  // Desktop screens
    return 2; // 2:1 aspect ratio
  }
}

export function displayBarChart(yValues) {
    var xValues = [
      "ASIA",
      "AUSTRALIA",
      "EUROPE",
      "INDIA",
      "JAPAN",
      "USA",
      "USA_WEST",
      "RUSSIA",
    ]
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
          maintainAspectRatio: true, // Ensure aspect ratio is maintained
          aspectRatio: getAspectRatio(), // Set the aspect ratio, 2:1 (width:height)
          scales: {
            y: {
              min: 0,
              max: 80
            }
          },
          plugins: {
            legend: {
              display: true,
            },
          },
        },
      });
    }
  }