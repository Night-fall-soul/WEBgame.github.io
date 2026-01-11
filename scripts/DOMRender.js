import {
    createGameOverContainer,
    createMainMenuContainer,
    createGameContainer,
    createQuickMenuContainer
} from "./Templates.js";

class DOMRender {
    constructor(rootElement = "app") {
        this.app = document.getElementById("app");

        this.containers = {
            game: null,
            gameOver: null,
            quickMenu: null,
            mainMenu: null
        };

        this.initializeContainers();
    }

    initializeContainers() {
        const containerDefinitions = [
            {
                id: "main-menu-container",
                key: "mainMenu",
                content: createMainMenuContainer()
            },
            {
                id: "game-container",
                key: "game",
                content: createGameContainer()
            },
            {
                id: "game-over-container",
                key: "gameOver",
                content: createGameOverContainer()
            },
            {
                id: "quick-menu-container",
                key: "quickMenu",
                content: createQuickMenuContainer()
            }
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
        this.showContainer("mainMenu");
    }

    showContainer(key) {
        this.hideAllContainers();
        const container = this.containers[key];
        if (container) {
            container.style.display = "flex";
        } else {
            console.error(`Container with key "${key}" not found.`);
        }
    }

    hideContainer(key) {
        const container = this.containers[key];
        if (this.containers[key]) container.style.display = "none";
    }

    hideAllContainers() {
        Object.keys(this.containers).forEach((key) => {
            this.hideContainer(key);
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
            el = document.createElement("div");
            el.id = entity.id || `entity-${entity.type}-${Date.now()}`;
            // Add a class for styling soon... may be .player or .obstacle
            el.classList.add("entity");
            el.classList.add(entity.type ? entity.type.toLowerCase() : "obstacle");
            el.style.position = "absolute";
            gameArea.appendChild(el);
        }

        const x = entity.x !== undefined ? entity.x : (entity.position ? entity.position.x : 0);
        const y = entity.y !== undefined ? entity.y : (entity.position ? entity.position.y : 0);

        this.updateElementPosition(el, x, y);
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
        const scoreEl = document.getElementById("score-value");
        if (scoreEl) scoreEl.innerText = Math.round(score);
    }

    removeElement(elementId) {
        const el = document.getElementById(elementId);
        if (el) el.remove();
    }

    // return gamearea div dimensions
    getCanvasDimensions() {
        const gameArea = document.getElementById("game-area");
        if (gameArea) {
            return {
                width: gameArea.clientWidth,
                height: gameArea.clientHeight
            };
        }
    }
}

export default DOMRender;
