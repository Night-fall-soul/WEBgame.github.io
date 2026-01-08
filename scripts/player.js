class Player {
    position = {
        x: 0,
        y: 0,
    };

    constructor(name, speed, position) {
        this.type = "Player";
        this.id = `player-${name}`;

        this.name = name;
        this.score = 0;
        this.speed = 8 * gameLevel * 1.2;
        this.position = position;

        this.jett_dash = gameLevel >= 3;
        this.lastDashTime = 0;

        this.bullets = [];
        this.gameDifficulty;
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
        const { dx, dy } = this.determine_directions();

        // 2. Movement
        this.move(dx, dy, deltaTime);

        // 3. Dash
        if (this.determine_if_player_dash() && this.canDash()) {
            this.dash(50, dx, dy);
        }

        // 4. Shoot
        if (this.determine_if_player_shoot()) {
            this.shoot();
        }

        // 5. Cooldowns
        this.jett_dash = Date.now() - this.lastDashTime >= 10000;
    }

    move(
        direction_x,
        direction_y,
        time /* its DELTA TIME the time btween frame and frame (but its okay just a naming convention) */,
    ) {
        // calculates the new direction of movement

        this.position.x +=
            direction_x *
            time *
            this.speed *
            0.1; /* adding 0.1 if not the player will go brrr */
        this.position.y += direction_y * time * this.speed * 0.1;

        // PLAYER DOES NOT DRAW HIM TO HIMSELFFFF
        // this.render()
    }

    dash(dash_distance, dir_x, dir_y) {
        if (!this.canDash() || (dir_x === 0 && dir_y === 0)) return;
        else {
            this.position.x += dir_x * dash_distance;
            this.position.y += dir_y * dash_distance;

            this.jett_dash = false;
            this.lastDashTime = Date.now(); // Record when we dashed
        }
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

        const bullet = {
            id: `bullet-${Date.now()}-${Math.random()}`, // unique id
            type: "Bullet", // Domrender .bullet (css goes brr)
            position: {
                x: this.position.x + 15,
                y: this.position.y - 10,
            },
            speed: 15,
            active: true,
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
    canDash() {
        return this.jett_dash;
    }

    hit() {
        //when the colissionmanager detects a collision
        this.element.classList.add("hit-flash"); // Add a CSS animation
        this.score = Math.max(0, this.score - 5);
        setTimeout(() => this.element.classList.remove("hit-flash"), 200);
    }
    getBounds() {
        return {
            x: this.position.x,
            y: this.position.y,
            width: 50, // Match your CSS
            height: 50,
        };
    }
    //au cas ou y'en a pas render elsewhere c ici:
    render() {
        this.element.style.transform = `translate3d(${this.position.x}px, ${this.position.y}px, 0)`;
    }

    determine_directions() {
        if (keys["ArrowUp"] || keys["KeyW"]) dy = -1;
        if (keys["ArrowDown"] || keys["KeyS"]) dy = 1;
        if (keys["ArrowLeft"] || keys["KeyA"]) dx = -1;
        if (keys["ArrowRight"] || keys["KeyD"]) dx = 1;
        // we gotta return an object
        return { dx, dy };
    }
    determine_if_player_dash() {
        if (keys["ShiftLeft"] || keys["ShiftRight"]) {
            return true;
        }
        return false;
    }
    determine_if_player_shoot() {
        if (keys["Space"]) {
            return true;
        }
        return false;
    }

    getLevel(level) {
        this.level = level;
    }
}

export default Player;
