export function setupButtons() {
    const buttons = document.querySelectorAll('.toggle-button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('selected')); // remove Selected from all other buttons
            button.classList.add('selected'); // add Selected to this button
        });
    });
}