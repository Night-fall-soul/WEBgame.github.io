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

    showContainer(key) {
        this.hideAllContainers();
        if (this.containers[key]) container.style.display = "flex";
    }

    hideContainer(key) {
        if (this.containers[key]) container.style.display = "none";
    }

    hideAllContainers() {
        Object.values(this.containers).forEach((container) => {
            this.hideContainer(container);
        });
    }

    /**
     * Creates a DOM element for a game entituy (Player or Obstacle)
     * @param {object} entity
     */
    renderTemplate(entity) {
        const gameArea = document.getElementById("game-area");
        if (!gameArea) return;

        let el = document.getElementById(entity.id || `entity-${entity.type}`);

        if (!el) {
            el = docuemnt.createElement("div");
            el.id = entity.id || `entity-${entity.type}-${Date.now()}`;
            // Add a class for styling soon... may be .player or .obstacle
            el.classList.add(entity.tupe ? entity.type.toLowerCase() : "obstacle");
            el.style.position = "absolute";
            gameArea.appendChild(el);
        }

        this.updateElementPosition(el, entity.x, entity.y);
        return el;
    }

    updateElementPosition(elementOrId, x, y) {
        let el = elementOrId;
        if (typeof elementOrId === "string") {
            el = document.getElementById(elementOrId);
        }

        if (el) {
            el.style.transform = `translate(${x}px, ${y}px)`;
            // maybe ensuring w/h are set if not in css but not necessary if css
        }
    }

    drawScore(score) {
        const scoreEl = docuemnt.getElementById("score-value");
        if (scoreEl) scoreEl.innerText = score;
    }

    removeElement(elementId) {
        const el = document.getElementById(elementId);
        if (el) el.remove();
    }

    // return gamearea div dimensions
    getCanvasDimensions() {
        const gameArea = document.getElementById("game-area");
        if (gameArea) {
            return  {
                width: gameArea.clientWidth,
                height: gameArea.clientHeight
            }
        }
    }
}

export default DOMRender;
