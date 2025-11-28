class ObstacleManager {
    obstacles = [];
    spawnTimer = 0;
    nextObstacleId = 1;


    constructor(domRender, gameConstants) {
        this.domRender = domRender;
        this.gameConstants = gameConstants;
    }

    update(deltaTime) {
        // move this.obstacles and call domRender.updateElementPosition ...
    }

    spawnObstacle() {
        // new obstacle, add it to this.obstacles and this.domrender.rendertemplate maybe
        this.obstacles[nextObstacleId] = new Obstacle();
        this.domRender.renderTemplate(this.obstacles[nextObstacleId]);
        
    }

    getObstacles() {
        return this.obstacles;
    }

    cleanupObstacles() {
        // Delete obstacles at the end of the limits. this.domRnder.removeElment, clean this.obstacles ...
    }

    reset() {
        // resets this.obstacles and counters
    }

    getObstacleData(type) {
        // Logic to obtain data from this.gameConstants (?)
    }
}

export default ObstacleManager;
