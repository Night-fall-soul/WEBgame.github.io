class Player {
    position = {
        x: 0,
        y: 0,
    };

    constructor(name, position, size, inputManager) {
        this.type = "Player";
        this.id = `player-${name}`;

        this.name = name;
        this.score = 0;
        this.position = position;
        this.playerSize = size;

        this.jett_dash = false;
        this.lastDashTime = 0;
        this.lastShotTime = Date.now();

        this.isDashing = false;
        this.dashStartTime = 0;
        this.dashDirection = { x: 0, y: 0 };

        this.bullets = [];
        this.level = 1;
        this.speed = 0.1 + this.level * 0.1;

        this.input = inputManager;
    }

    update(deltaTime) {
        // updates everything ok

        /*
                this.score += 10; //the incrementation of the score i 've put as to be seen afterwards.
                this.speed = speed_updated;
                this.position = pos_updated;
                this.jett_dash = (Date.getTime() - last_time_dashed) >= 10 * 1000 ? true : false;
                */
        // Okay, this updates nothing, so i'll comment it. Amine and I have talked abt this
        // everything understood now. Love you amine my brudah

        // 1. Input
        
        if (this.isDashing) {
            if (Date.now() - this.dashStartTime > 100) {
                this.isDashing = false;
            }
        }

        const inputDir = this.determine_directions();

        let X = 0;
        let Y = 0;

        if (this.isDashing) {
            // SI ESTAMOS EN DASH: Ignoramos el teclado y usamos la dirección guardada
            X = this.dashDirection.x;
            Y = this.dashDirection.y;
        } else {
            // MOVIMIENTO NORMAL: Usamos el teclado
            X = inputDir.dx;
            Y = inputDir.dy;
        }

        // 2. Movement
        this.move(X, Y, deltaTime);

        // 3. Dash
        if (this.determine_if_player_dash() && this.canDash()) {
            if (inputDir.dx !== 0 || inputDir.dy !== 0) {
                this.dash(inputDir.dx, inputDir.dy);
            }
        }

        // 4. Shoot
        if (this.determine_if_player_shoot()) {
            this.shoot();
        }

        this.updateBullets(deltaTime);

        // 5. Cooldowns
        this.jett_dash = Date.now() - this.lastDashTime >= 2000;
    }

    move(
        direction_x,
        direction_y,
        time /* its DELTA TIME the time btween frame and frame (but its okay just a naming convention) */,
    ) {
        // calculates the new direction of movement
        
        let currentSpeed = this.speed;
        if (this.isDashing) {
            currentSpeed *= 4.5 - (this.level * 0.5);
        }
        
        const gameArea = document.getElementById("game-area");
        let nextX = this.position.x + (direction_x * time * currentSpeed * 0.1);
        let nextY = this.position.y + (direction_y * time * currentSpeed * 0.1);

        const playerSize = this.playerSize; 
        const maxX = gameArea.clientWidth - playerSize;
        const maxY = gameArea.clientHeight - playerSize;
        
        this.position.x = Math.max(0, Math.min(nextX, maxX));
        
        this.position.y = Math.max(0, Math.min(nextY, maxY));

        


        // PLAYER DOES NOT DRAW HIM TO HIMSELFFFF
        // this.render()
    }

    dash(dir_x, dir_y) {
        this.isDashing = true;
        this.dashStartTime = Date.now();

        this.dashDirection = { x: dir_x, y: dir_y };

        this.jett_dash = false;
        this.lastDashTime = Date.now();
    }

    shoot() {
        // this.dom.renderTemplate (maybe not the best name) asks for an object
        // therefore we have to create a "bullet" object
        // then we will ask for the colission manager if we killed an enemy or not.

        // 1. Création du visuel
        /*
                const bulletEl = document.createElement('div');
                bulletEl.className = 'bullet';
                bulletEl.style.cssText = `
                position: absolute;
                width: 4px;
                height: 15px;
                background: #00ffcc;
                border-radius: 2px;
            `;
                container.appendChild(bulletEl);

                // 2. Objet projectile vertical
                const bullet = {
                    element: bulletEl,
                    x: this.position.x + 23, // Centré sur le joueur (si joueur fait 50px)
                    y: this.position.y - 10, // Part du haut du joueur
                    speed: 15,               // Vitesse de remontée
                    active: true
                };*/
        if (this.lastShotTime && Date.now() - this.lastShotTime < 300)
            return null;
        this.lastShotTime = Date.now();

        const bullet = {
            id: `bullet-${Date.now()}-${Math.random().toString(10)}`, // unique id
            type: "Bullet", // Domrender .bullet (css goes brr)
            position: {
                x: this.position.x + 11,
                y: this.position.y - 10,
            },
            speed: 1,
            active: true,

            width: 8,
            height: 8,
        };

        this.bullets.push(bullet);
    }

    /*
        updateBullets(obstacles) {
            for (let i = this.bullets.length - 1; i >= 0; i--) {
                const b = this.bullets[i];

                // Mouvement vers le haut (Y diminue)
                b.y -= b.speed;
                b.element.style.transform = `translate(${b.x}px, ${b.y}px)`;

                // Check Collision avec chaque obstacle
                let hit = false;
                for (let obs of obstacles) {
                    const ob = obs.getBounds();

                    // Collision simple
                    if (b.x < ob.x + ob.width &&
                        b.x + 4 > ob.x &&
                        b.y < ob.y + ob.height &&
                        b.y + 15 > ob.y) {

                        obs.hit(); // L'obstacle réagit
                        hit = true;
                        break;
                    }
                }

                // Suppression (Sortie d'écran ou Impact)
                if (hit || b.y < -20) {
                    b.element.remove();
                    this.bullets.splice(i, 1);
                }
            }
        }
        */

    updateBullets(deltaTime) {
        const gameArea = document.getElementById("game-area");

        for (let i = this.bullets.length - 1; i >= 0; i--) {
            const bullet = this.bullets[i];

            bullet.position.y -= bullet.speed * deltaTime;

            let bulletEl = document.getElementById(bullet.id);

            if (!bulletEl && gameArea) {
                bulletEl = document.createElement("div");
                bulletEl.id = bullet.id;
                bulletEl.className = "entity bullet";

                gameArea.appendChild(bulletEl);
            }

            if (bulletEl) {
                bulletEl.style.left = `${bullet.position.x}px`;
                bulletEl.style.top = `${bullet.position.y}px`;
            }

            if (bullet.position.y < -20) {
                if (bulletEl) bulletEl.remove();
                this.bullets.splice(i, 1);
            }
        }
    }

    canDash() {
        return this.jett_dash;
    }

    hit() {
        //when the colissionmanager detects a collision
        const el = document.getElementById(this.id);
        if (el) {
            el.classList.add("hit-flash"); // Add a CSS animation
            this.score = Math.max(0, this.score - 5);
            setTimeout(() => el.classList.remove("hit-flash"), 200);
        }
    }

    getBounds() {
        return {
            x: this.position.x,
            y: this.position.y,
            width: 30, // Match your CSS
            height: 30,
        };
    }

    //au cas ou y'en a pas render elsewhere c ici:
    render() {
        this.element.style.transform = `translate3d(${this.position.x}px, ${this.position.y}px, 0)`;
    }

    determine_directions() {
        let dx = 0;
        let dy = 0;

        if (this.input.isActionActive("moveUp")) dy += -1;
        if (this.input.isActionActive("moveDown")) dy += 1;
        if (this.input.isActionActive("moveLeft")) dx += -1;
        if (this.input.isActionActive("moveRight")) dx += 1;

        return { dx, dy };
    }

    determine_if_player_dash() {
        return this.input.isActionActive("dash");
    }

    determine_if_player_shoot() {
        return this.input.isActionActive("shoot");
    }

    getLevel(level) {
        this.level = level;
        if (level == 4) level = 3;
        this.speed = 2 + level * 1.08;
        this.jett_dash = level >= 3;
    }
}

export default Player;
