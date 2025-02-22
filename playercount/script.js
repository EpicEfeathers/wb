import { displayBarChart } from './scripts/charts.js'
import { populateTime } from './scripts/selectors.js'
import { fetchCSV, filterRows, getClassic } from './scripts/csv_functions.js'

const firstTime = 1734319863;
const today = new Date().toISOString().split("T")[0];

let globalCSV = "";
let classic = [
  "ASIA",
  "AUSTRALIA",
  "EUROPE",
  "INDIA",
  "JAPAN",
  "RUSSIA",
  "USA",
  "USA_WEST",
];

//setup
main();
document.getElementById("date").max = today;
document.getElementById("date").value = today;

const timeSelect = document.getElementById("time");
const dateSelect = document.getElementById("date");
populateTime(timeSelect, dateSelect);
dateSelect.addEventListener("change", () => populateTime(timeSelect, dateSelect));
dateSelect.addEventListener("change", () => showNewChart());
timeSelect.addEventListener("change", () => showNewChart());

// setup
async function main() {
  globalCSV = await fetchCSV();

  // original bar chart
  const formatted = getTimestampFromSelectors();
  const region_players = getClassic(globalCSV, formatted);
  
  displayBarChart(region_players);
}

function timestampToFormatted(timestamp) {
  const difference = timestamp - firstTime;
  const differenceFormatted = Math.floor(Math.floor(difference / 60) / 30);

  return differenceFormatted;
}

function getTimestampFromSelectors() {
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;

  const dateTimeString = `${date}T${time}:00`;
  const dateTime = Math.floor(new Date(dateTimeString) / 1000); // returns in ms so divide by 1000
  const formatted = timestampToFormatted(dateTime);
  //console.log(`Half hours since beginning: ${formatted}`);

  return formatted
}

function showNewChart() {
  const formatted = getTimestampFromSelectors();
  const region_players = getClassic(globalCSV, formatted);

  displayBarChart(region_players);
}




// Update Footer Date
document.getElementById("footer").textContent = new Date().getFullYear()