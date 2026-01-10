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
     */
    constructor(
        player,
        scoreManager,
        obstacleManager,
        collisionDetection,
        domRender
    ) {
        // Store all injected dependencies
        this.player = player;
        this.scoreManager = scoreManager;
        this.obstacleManager = obstacleManager;
        this.collisionDetection = collisionDetection;
        this.domRender = domRender;
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

        this.player.bullets = [];
        this.player.jett_dash = true;
    }

    /**
     * Starts the main game loop (e.g., using requestAnimationFrame).
     */
    start() {
        this.isPaused = false;
        this.lastFrameTime = Date.now();
        this.gameLoop(this.lastFrameTime);
    }

    /**
     * The main game loop function, executed every frame.
     * @param {number} currentTime - Time in milliseconds.
     */
    gameLoop(currentTime) {
        if (this.isPaused) return;

        // 1. Calculate deltaTime
        const deltaTime = currentTime - this.lastFrameTime;

        // 2. Call this.update(deltaTime);
        this.update(deltaTime);

        // 3. Schedule next frame (requestAnimationFrame).
        this.animationFrameId = requestAnimationFrame((time) => this.gameLoop(time));
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
        this.domRender.renderTemplate(this.player);

        // 3. Handle collisions: this.handleCollisions();
        this.handleCollisions();

        // 4. Check win/loss state: if (!this.player.isAlive()) { this.gameOver(); }
        this.scoreManager.addScore(0.01 * deltaTime);
    }

    // --- State and Utility Functions ---

    /**
     * Handles collision checks and delegates the reaction logic.
     */
    handleCollisions() {
        const obstacles = this.obstacleManager.getObstacles();
        const collision = this.collisionDetection.checkPlayerCollision(
            this.player.getBounds(),
            obstacles
        );

        if (collision) {
            this.player.hit(); // Reaction logic delegated to Player
            this.gameOver();
        }
    }

    /**
     * Pauses the game loop.
     */
    pause() {
        this.isPaused = true;
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
    }

    /**
     * Executes the end-of-game logic (display score, show menu).
     */
    gameOver() {
        // Calls this.pause();
        this.pause();

        // Uses this.scoreManager.getScore() to get the final score.
        const finalScore = Math.floor(this.scoreManager.getScore());

        // Uses this.domRender to show the Game Over screen.
        const finalScoreEl = document.getElementById("final-score-value");
        if (finalScoreEl) finalScoreEl.innerText = finalScore;

        this.domRender.showContainer("gameOver");
    }
}

export default Game;
