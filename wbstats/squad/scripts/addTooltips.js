function tooltip(element, content) {
    tippy(element, {
        content: content,
        allowHTML: true, // lets you add line breaks etc.

        arrow: true,
        placement: "top",

        theme: 'custom'
    });
}

export function addTooltips() {
    tooltip(document.querySelector(".kelo-container"), "Average kills ELO <br> across the whole squad.")
    tooltip(document.querySelector(".gelo-container"), "Average games ELO <br> across the whole squad.")
}