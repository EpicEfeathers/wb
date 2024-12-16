export function populateTime(timeSelect, dateSelect) {
    timeSelect.innerHTML = "";
    let date = new Date(`${dateSelect.value}T00:00:00`); // avoid timezone discrepancy
    let now = new Date();
    console.log(now.getHours());
  
    if (date.toDateString() == now.toDateString()) {
      for (let hour = 0; hour < now.getHours() + 1; hour++) {
        for (let min = 0; min < 60; min += 30) {
          if (hour === now.getHours() && min > now.getMinutes()) break;
          const timeSelect = document.getElementById("time");
          const value = `${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
          const label = new Date(`1970-01-01T${value}:00`).toLocaleTimeString(
            [],
            { hour: "2-digit", minute: "2-digit" },
          );
          const option = new Option(label, value);
          timeSelect.add(option);
          timeSelect.value = value;
        }
      }
    } else {
      for (let hour = 0; hour < 24; hour++) {
        for (let min = 0; min < 60; min += 30) {
          const value = `${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
          const label = new Date(`1970-01-01T${value}:00`).toLocaleTimeString(
            [],
            { hour: "2-digit", minute: "2-digit" },
          );
          const option = new Option(label, value);
          timeSelect.add(option);
        }
      }
    }
  }