class ObstacleManager {
    /**
     * @param {DOMRender} domRender
     */
    constructor(domRender, gameConstants) {
        this.domRender = domRender;
        this.gameConstants = gameConstants;
        this.obstacles = [];
        this.spawnTimer = 0;
        this.nextObstacleId = 1;
        this.spawnRate = 1000;
        this.level = 0;

        this.minSpawnTime = 1000;
        this.maxSpawnTime = 2000;
        this.setNextSpawnTime();
        this.nextSpawnTime = 0;

        this.fallSpeed = 0.08;
        this.lateralSpeed = 0.1;
        this.driftState = -1;
    }

    setNextSpawnTime() {
        this.nextSpawnTime = Math.floor((Math.random() * (this.maxSpawnTime - this.minSpawnTime + 1) + this.minSpawnTime));
    }

    update(deltaTime) {

        // gonna thank markov's chains for this
        // we gotta get the level and change difficulty thanks to the spawn rate
        // also make the object move faster and be more prone to change horizontal
        // direction.
        // lads gonna have fun with this

        // first we spawn our objects
        this.spawnTimer += deltaTime;

        if (this.spawnTimer > this.nextSpawnTime) {
            this.spawnObstacle();
            this.spawnTimer = 0;
            this.setNextSpawnTime();

            console.log("spawning obstacle, next in " + this.nextSpawnTime + "ms");
        }


        const gameHeight = this.domRender.getCanvasDimensions().height;
        const gameWidth = this.domRender.getCanvasDimensions().width;

        for (let i = this.obstacles.length - 1; i >= 0; i--) {
            const obs = this.obstacles[i];

            // i really need to start over. may god be with me
            // first time failed
            // second time failed
            // need to study optimization :(
            // third time failed

            this.applyMarkovChain(obs);

            obs.y += (this.fallSpeed * deltaTime * (1 + this.level * 0.05));
            obs.x += (obs.driftState * this.lateralSpeed * deltaTime);

            if (obs.x <= 0) {
                obs.x = 0;
                obs.driftState = 1;
            } else if (obs.x + obs.width >= gameWidth) {
                obs.x = gameWidth - obs.width;
                obs.driftState = -1;
            }

            if (obs.y > gameHeight) {
                this.domRender.removeElement(obs.id);
                this.obstacles.splice(i, 1);
            } else {
                this.domRender.updateElementPosition(obs.id, obs.x, obs.y);
            }
        }
    }

    applyMarkovChain(obstacle) {
        const changeProb = 0.01 + this.level * 0.005;

        if (Math.random() < changeProb) {
            console.log("changing!");
            const rand = Math.random();
            if (rand < 0.33) {
                obstacle.driftState = -1;
            } else if (rand < 0.66) {
                obstacle.driftState = 0;
            } else {
                obstacle.driftState = 1;
            }
        }
    }

    spawnObstacle() {
        // new obstacle, add it to this.obstacles and this.domrender.rendertemplate maybe
        //
        // gonna change strat, we gonna create here the object, so we don't need to look
        // in any other class (it's less elegant but idk)

        const dimensions = this.domRender.getCanvasDimensions();
        const width = dimensions.width;

        const id = `obstacle-${this.nextObstacleId++}`;
        const obstacle = {
            id: id,
            type: "Obstacle", // css formatting goes brr
            x: Math.random() * (width - 20),
            y: -20,
            width: 20,
            height: 20,
            driftState: (Math.random() < 0.33 ? -1 : (Math.random() < 0.5 ? 0 : 1))
        };

        this.obstacles.push(obstacle);
        this.domRender.renderTemplate(obstacle);
    }

    // dunno if its useful
    getObstacles() {
        return this.obstacles;
    }

    reset() {
        this.obstacles.forEach((obstacle) =>
            this.domRender.removeElement(obstacle.id)
        );
        this.obstacles = [];
        this.nextObstacleId = 1;
        this.spawnTimer = 0;
    }

    // the me of 2 months ago didn't know what he was doing so... let me comment this fucn
    /*
    getObstacleData(type) {
        // Logic to obtain data from this.gameConstants (?)
    }

    cleanupObstacles() {
        // Delete obstacles at the end of the limits. this.domRnder.removeElment, clean this.obstacles ...
    }
    */

    getLevel(level) {
        this.level = level;

        switch (this.level) {
            case 3:
                this.minSpawnTime = 300;
                this.maxSpawnTime = 700;
                break;
            case 2:
                this.minSpawnTime = 600;
                this.maxSpawnTime = 1200;
                break;
            default:
                this.minSpawnTime = 1000;
                this.maxSpawnTime = 2000;
        }
    }
}

export default ObstacleManager;
