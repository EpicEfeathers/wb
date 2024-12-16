export async function fetchCSV() {
    const response = await fetch(
      "../data/playercount.csv",
    );
    return await response.text();
  }


export function filterRows(csv, value) {
    const rows = csv.split("\n");
    const filteredRows = rows.filter((row) => {
      const columns = row.split(",");
      return columns[0] == value;
    });
  
    const players = [];
    filteredRows.forEach((row) => {
      const column = row.split(",");
      players.push(column[column.length - 1]);
    });
  
    return players;
  }


export function getClassic(csv, timestamp) {
  const classic_regions = [
    "ASIA",
    "AUSTRALIA",
    "EUROPE",
    "INDIA",
    "JAPAN",
    "USA",
    "USA_WEST",
    "RUSSIA",
  ];
  let region_players = []

  const [regions, ...data] = csv.split("\n"); // first index is regions, all following ones are data
  let timestampData = data.filter(row => Number(row.split(",")[0]) == timestamp)
  classic_regions.forEach(region => {
    region_players.push(getData(timestampData.toString(), regions, region));
  });
  return region_players;
}

function getData(data, regions, region) {

  let totalPlayers = 0
  const index = regions.split(",").indexOf(region); // turns regions into an array, and finds the index of the specified region
  const column = data.split(',');
  totalPlayers = column[index]
  
  return totalPlayers
}