import DOMRender from "./DOMRender.js";
import { INPUT_BINDINGS } from "./Constants.js";
import InputManager from "./InputManager.js";
import KeyboardInput from "./KeyboardInput.js";
import Player from "./Player.js";
import Game from "./Game.js"; // Asegúrate de importar Game
import ScoreManager from "./ScoreManager.js";
import ObstacleManager from "./ObstacleManager.js";
import CollisionDetection from "./ColisionDetector.js";

const render = new DOMRender();
const inputManager = new InputManager();
const keyboard = new KeyboardInput(INPUT_BINDINGS);
inputManager.addSource(keyboard);

const collisionDetector = new CollisionDetection();
const scoreManager = new ScoreManager(render);

const obstacleManager = new ObstacleManager(render, null);

const initialPlayerPos = { x: 300, y: 300 };
const player = new Player("Sparky", initialPlayerPos, 30, inputManager);

const game = new Game(
    player,
    scoreManager,
    obstacleManager,
    collisionDetector,
    render
);

document.addEventListener("DOMContentLoaded", () => {

    const startBtn = document.getElementById("start-btn");
    if (startBtn) {
        startBtn.addEventListener("click", () => {
            const nameInput = document.getElementById("name-field");
            if (nameInput && nameInput.value.trim() !== "") {
                player.name = nameInput.value;
            }

            const difficultySelect = document.getElementById("difficulty");
            const difficultyVal = difficultySelect ? difficultySelect.value : "Facile";

            let level = 1;
            if (difficultyVal === "Moyen") level = 2;
            if (difficultyVal === "Difficile") level = 3;

            if (typeof player.getLevel === "function") player.getLevel(level);
            if (typeof obstacleManager.getLevel === "function") obstacleManager.getLevel(level);

            startGame();
        });
    }

    const restartBtn = document.getElementById("restart-btn");
    if (restartBtn) {
        restartBtn.addEventListener("click", () => {
            startGame();
        });
    }

    const menuBtn = document.getElementById("menu-btn");
    if (menuBtn) {
        menuBtn.addEventListener("click", () => {
            render.showContainer("mainMenu");
        });
    }
});

function startGame() {
    render.showContainer("game");
    game.init();
    game.start();
}
