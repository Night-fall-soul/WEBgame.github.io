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
    }

    update(deltaTime) {
        // move this.obstacles and call domRender.updateElementPosition ...

        // gonna thank markov's chains for this
        // we gotta get the level and change difficulty thanks to the spawn rate
        // also make the object move faster and be more prone to change horizontal
        // direction.
        // lads gonna have fun with this

        // first we spawn our objects
        this.spawnTimer += deltaTime;

        if (this.spawnTimer > this.spawnRate) {
            this.spawnObstacle();
            this.spawnTimer = 0;

            let minTime, maxTime;

            switch (difficulty) {
                case 3:
                    minTime = 300;
                    maxTime = 700;
                    break;
                case 2:
                    minTime = 600;
                    maxTime = 1200;
                    break;
                case 1:
                    break;
                default:
                    minTime = 1000;
                    maxTime = 2000;
                    break;
            }

            this.spawnRate = Math.random() * (maxTime - minTime) + minTime;
        }

        const gameHeight = this.domRender.getCanvasDimensions().height;
        const gameWidth = this.domRender.getCanvasDimensions().width;

        for (let i = this.obstacles.length - 1; i >= 0; i--) {
            const obs = this.obstacles[i];

            if (obs.vx === undefined) {
                obs.vx = (Math.random() < 0.5 ? -1 : 1) * 0.1;
            }

            // MARKOV'S CHAIN LETS GOOOOOOOOOO
            const changeDirectionChance = this.level * 0.01;
            if (Math.random() < changeDirectionChance) {
                obs.vx *= -1;
            }

            // update movement
            obs.y += 0.2 * deltaTime;
            obs.x += obs.vx * deltaTime;

            // iSaborit's note:
            // at this moment, i don't know if what i'm coding it makes sense or not....

            // bota bota la pelota
            if (obs.x <= 0 || obs.x >= gameWidth) {
                obs.vx *= -1;
                // Corregir posición para que no se quede pegado fuera
                obs.x = Math.max(0, Math.min(obs.x, gameWidth));
            }

            // once it has touched the floor, we gotta delete our object
            if (obs.y > gameHeight) {
                this.domRender.removeElement(obs.id);
                this.obstacles.splice(i, 1);
            } else {
                this.domRender.updateElementPosition(obs.id, obs.x, obs.y);
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
            position: {
                x: Math.random() * (width - 20),
                y: -20,
            },
            width: 20,
            height: 20,
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
            this.domRender.removeElement(obstacle.id),
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
    }
}

export default ObstacleManager;
