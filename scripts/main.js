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
    render,
    inputManager
);

document.addEventListener("DOMContentLoaded", () => {
    updateLeaderboard();

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
            if (difficultyVal === "mid") level = 2;
            if (difficultyVal === "hard") level = 3;
            if (difficultyVal === "dont") level = 4;

            if (typeof player.getLevel === "function") player.getLevel(level);
            if (typeof obstacleManager.getLevel === "function") obstacleManager.getLevel(level);

            startGame();
        });
    }

    const resumeBtn = document.getElementById("resume-btn");
    if (resumeBtn) {
        resumeBtn.addEventListener("click", () => {
            game.resume();
        });
    }

    const restartPauseBtn = document.getElementById("restart-pause-btn");
    if (restartPauseBtn) {
        restartPauseBtn.addEventListener("click", () => {
            game.stop();
            startGame();
        });
    }

    const quitBtn = document.getElementById("quit-btn");
    if (quitBtn) {
        quitBtn.addEventListener("click", () => {
            game.stop();
            render.showContainer("mainMenu");
            updateLeaderboard();
        });
    }

    const restartBtn = document.getElementById("restart-btn");
    if (restartBtn) {
        restartBtn.addEventListener("click", () => {
            updateLeaderboard();
            startGame();
        });
    }

    const menuBtn = document.getElementById("menu-btn");
    if (menuBtn) {
        menuBtn.addEventListener("click", () => {
            render.showContainer("mainMenu");
            updateLeaderboard();
        });
    }
});

function startGame() {
    render.showContainer("game");
    game.init();
    game.start();
}

function updateLeaderboard() {
    const list = document.getElementById("scoreboard-list");
    if (!list) return;

    const scores = scoreManager.getHighScores();
    list.innerHTML = scores
        .map(s => `<li style="margin-bottom: 5px;"><b>${s.name}</b>: ${s.score}</li>`)
        .join("");
}