/**
 * The main orchestrator of the game. Manages the game loop, initialization,
 * state transitions, and collision handling.
 */
class Game {
    // --- Internal State ---
    isPaused = true;
    lastFrameTime = 0;

    /**
     * Constructor receives all core component dependencies via DI.
     * @param {object} player - Player instance.
     * @param {object} scoreManager - ScoreManager instance.
     * @param {object} obstacleManager - ObstacleManager instance.
     * @param {object} collisionDetection - CollisionDetection instance.
     * @param {object} domRender - DOMRender instance.
     * @param {object} inputManager - inputManager instance.
     */
    constructor(
        player,
        scoreManager,
        obstacleManager,
        collisionDetection,
        domRender,
        inputManager
    ) {
        // Store all injected dependencies
        this.player = player;
        this.scoreManager = scoreManager;
        this.obstacleManager = obstacleManager;
        this.collisionDetection = collisionDetection;
        this.domRender = domRender;

        this.inputManager = inputManager;
        this.isGameActive = false;
        this.wasPausePressed = false;
    }

    // --- Core Lifecycle Functions ---

    /**
     * Initializes all game components and loads the initial scene.
     */
    init() {
        // Calls reset() on ScoreManager and ObstacleManager.
        // Calls init() on DOMRender.
        this.scoreManager.reset();
        this.obstacleManager.reset();

        const dims = this.domRender.getCanvasDimensions();
        if (dims) {
            this.player.position = { x: dims.width / 2 - 15, y: dims.height - 100 };
        }

        if (this.player.bullets && this.player.bullets.length > 0) {
            this.player.bullets.forEach(bullet => {
                this.domRender.removeElement(bullet.id);
            });
        }

        this.isGameActive = false;

        this.player.bullets = [];
        this.player.jett_dash = true;
    }

    /**
     * Starts the main game loop (e.g., using requestAnimationFrame).
     */
    start() {
        this.isPaused = false;
        this.isGameActive = true;
        this.lastFrameTime = performance.now();

        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }

        this.gameLoop(this.lastFrameTime);
    }

    /**
     * The main game loop function, executed every frame.
     * @param {number} currentTime - Time in milliseconds.
     */
    gameLoop(currentTime) {

        // 3. Schedule next frame (requestAnimationFrame).
        this.animationFrameId = requestAnimationFrame((time) => this.gameLoop(time));

        if (!currentTime) {
            currentTime = performance.now();
        }

        // 1. Calculate deltaTime
        const deltaTime = currentTime - this.lastFrameTime;

        // im. gonna. do. some. bad. things.
        this.lastFrameTime = currentTime;

        // 1.5 pause input¿?
        if (this.inputManager.isActionActive("pause")) {
            if (!this.wasPausePressed && this.isGameActive) {
                this.togglePause();
            }
            this.wasPausePressed = true;
        } else {
            this.wasPausePressed = false;
        }

        if (this.isPaused) return;

        // 2. Call this.update(deltaTime);
        this.update(deltaTime);

    }

    /**
     * Core update logic, called every frame.
     * @param {number} deltaTime - Time elapsed since the last frame.
     */
    update(deltaTime) {
        // 1. Update entities: this.player.update(deltaTime);
        this.player.update(deltaTime);
        this.domRender.renderTemplate(this.player);

        // 2. Update entities: this.obstacleManager.update(deltaTime);
        this.obstacleManager.update(deltaTime);

        // 3. Handle collisions: this.handleCollisions();
        this.handleCollisions(deltaTime);

        // 4. Check win/loss state: if (!this.player.isAlive()) { this.gameOver(); }
        this.scoreManager.addScore(0.01 * deltaTime);
    }

    // --- State and Utility Functions ---

    /**
     * Handles collision checks and delegates the reaction logic.
     */
    /**
     * Handles collision checks and delegates the reaction logic.
     */
    handleCollisions(deltaTime) {
        const obstacles = this.obstacleManager.getObstacles();

        const playerCollision = this.collisionDetection.checkPlayerCollision(
            this.player.getBounds(),
            obstacles
        );

        if (playerCollision) {
            this.player.hit();
            this.gameOver();
        }


        // Could find a better place, but its there for now.
        const bullets = this.player.bullets;

        for (let i = bullets.length - 1; i >= 0; i--) {
            const bullet = bullets[i];

            const distanceTraveled = (bullet.speed * deltaTime);

            const bulletBounds = {
                x: bullet.position.x,
                y: bullet.position.y,
                width: 8,
                height: 8 + distanceTraveled
            };

            for (let j = obstacles.length - 1; j >= 0; j--) {
                const obstacle = obstacles[j];

                if (this.collisionDetection.checkOverlap(bulletBounds, obstacle)) {


                    this.domRender.removeElement(obstacle.id);
                    this.domRender.removeElement(bullet.id);

                    obstacles.splice(j, 1);
                    bullets.splice(i, 1);

                    this.scoreManager.addScore(50);

                    break;
                }
            }
        }
    }

    /**
     * Pauses the game loop.
     */
    pause() {
        this.isPaused = true;
        this.domRender.showContainer("quickMenu");

        const pauseScoreElement = document.getElementById("pause-score-value");
        if (pauseScoreElement) {
            pauseScoreElement.innerText = Math.floor(this.scoreManager.getScore());
        }

        // 
        // 
        if (this.animationFrameId) {
            // cancelAnimationFrame(this.animationFrameId);
        }
    }

    togglePause() {
        if (this.isPaused) {
            this.resume();
        } else {
            this.pause();
        }
    }

    resume() {
        this.isPaused = false;
        this.domRender.showContainer("game");
        this.lastFrameTime = performance.now();
    }

    stop() {
        this.isGameActive = false;
        this.isPaused = true;
        if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    }

    /**
     * Executes the end-of-game logic (display score, show menu).
     */
    gameOver() {
        // Calls this.pause();
        this.pause();
        this.isGameActive = false;

        // Uses this.scoreManager.getScore() to get the final score.
        const finalScore = Math.floor(this.scoreManager.getScore());
        this.scoreManager.saveScore(this.player.name || "Unknown", finalScore);

        // Uses this.domRender to show the Game Over screen.
        const finalScoreEl = document.getElementById("final-score-value");
        if (finalScoreEl) finalScoreEl.innerText = finalScore;

        this.domRender.showContainer("gameOver");
    }
}

export default Game;
