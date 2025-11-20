// create-dom-elements.js
const containers = [
    "game-container",
    "game-over-container",
    "quick-menu-container",
    "main-menu-container",
];

export function createGameContainer() {
    const container = document.createElement("div");
    container.id = "game-container";
    container.class = "global-container";

    const canvas = document.createElement("canvas");
    container.appendChild(canvas);

    containers.forEach((existingContainer) => {
        // Ús correcte de Array.prototype.forEach
        const elem = document.getElementById(existingContainer);
        if (elem) {
            elem.remove();
        }
    });

    document.body.appendChild(container);
}

export function createQuickMenuContainer() { }
