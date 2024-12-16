export async function fetchCSV() {
    const response = await fetch(
      "https://raw.githubusercontent.com/epicefeathers/wb/main/data/playercount.csv",
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