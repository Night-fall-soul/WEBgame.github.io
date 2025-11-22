import {
    createGameOverContainer,
    createMainMenuContainer,
    createGameContainer,
    createQuickMenuContainer,
} from "./Templates.js";

class DOMRender {
    constructor(rootElement = "app") {
        this.app = document.getElementById("app");

        this.containers = {
            game: null,
            gameOver: null,
            quickMenu: null,
            mainMenu: null,
        };

        this.initializeContainers();
    }

    initializeContainers() {
        const containerDefinitions = [
            {
                id: "main-menu-container",
                key: "mainMenu",
                content: createMainMenuContainer(),
            },
            {
                id: "game-container",
                key: "game",
                content: createGameContainer(),
            },
            {
                id: "game-over-container",
                key: "gameOver",
                content: createGameOverContainer(),
            },
            {
                id: "quick-menu-container",
                key: "quickMenu",
                content: createQuickMenuContainer(),
            },
        ];

        containerDefinitions.forEach((definition) => {
            let container = document.getElementById(definition.id);

            if (!container) {
                container = document.createElement("div");
                container.id = definition.id;
                container.classList.add("global-container");
                container.innerHTML = definition.content;

                this.app.appendChild(container);
            }

            this.containers[definition.key] = container;
        });

        this.hideAllContainers();
        this.showContainer(this.containers.mainMenu);
    }

    showContainer(container) {
        if (container) container.style.display = "block";
    }

    hideContainer(container) {
        if (container) container.style.display = "none";
    }

    hideAllContainers() {
        Object.values(this.containers).forEach((container) => {
            this.hideContainer(container);
        });
    }
}

export default DOMRender;
