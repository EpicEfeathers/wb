import * as fillSelectMenus from './scripts/selectMenus/fillSelectMenus.js'
import * as csvFunctions from './scripts/csvFunctions.js'
import { processData } from './scripts/processData.js';
import { fetchCSVData } from './scripts/csvFunctions.js';


async function loadData() {
    csvData = await fetchCSVData();

    // initial call
    processData(csvData, timezoneMenu.value, serverMenu.value, timeframeMenu.value)
    return csvData;
}
let csvData;
loadData();


// populate select menus
fillSelectMenus.populateTimezoneSelectMenu();
fillSelectMenus.populateServerSelectMenu();

const timezoneMenu = document.getElementById("timezoneSelect");
const serverMenu = document.getElementById("serverSelect");
const timeframeMenu = document.getElementById("timeframeSelect");

// listeners
timezoneMenu.addEventListener("change", function () {
    //timezone = timezoneMenu.value;

    processData(csvData, timezoneMenu.value, serverMenu.value, timeframeMenu.value)
});


serverMenu.addEventListener("change", function () {
    //server = serverMenu.value;

    processData(csvData, timezoneMenu.value, serverMenu.value, timeframeMenu.value)
});

timeframeMenu.addEventListener("change", function () {
    //timeframe = timeframeMenu.value;

    processData(csvData, timezoneMenu.value, serverMenu.value, timeframeMenu.value)
});

// Update Footer Date
document.getElementById("footer").textContent = new Date().getFullYear()