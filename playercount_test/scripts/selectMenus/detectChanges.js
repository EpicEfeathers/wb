export function detectTimezoneChange() {
    const selectMenu = document.getElementById("timezoneSelect");

    selectMenu.addEventListener("change", function () {
        console.log(selectMenu.value)
    });
}

export function detectServerChange() {
    const selectMenu = document.getElementById("serverSelect");

    selectMenu.addEventListener("change", function () {
        console.log(selectMenu.value)
    });
}