class Player {
    position = {
        x: 0,
        y: 0
    };
    vitesse = {
        vx: 0,
        vy: 0
    };
    constructor(name, vitesse, position) {
        this.name = name;
        this.score = 0;
        this.vitesse = vitesse;
        this.position = position;
        this.jett_dash = game_level == 3 ? true : false;
        // DOM Injection
        this.element = document.createElement('div');
        this.element.className = 'player';
        this.element.id = `player-${this.name}`;
        // Basic css a voir apres
        this.element.style.position = 'absolute';
        this.element.style.width = '50px';
        this.element.style.height = '50px';
        this.element.style.backgroundColor = 'blue';

        parentElement.appendChild(this.element);
    }

    update(vitesse_updated, pos_updated, last_time_dashed) {
        // updates everything ok
        this.score += 10; //the incrementation of the score i 've put as to be seen afterwards.
        this.vitesse = vitesse_updated;
        this.position = pos_updated;
        this.jett_dash = (Date.getTime() - last_time_dashed) >= 10 * 1000 ? true : false;
    }

    move(direction_x, direction_y, time) {
        // calculates the new direction of movement
        this.position.x += direction_x * time * this.vitesse.vx
        this.position.y += direction_y * time * this.vitesse.vy
        this.render()
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

    shoot(container) {
        // 1. Création du visuel
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
        this.element.classList.add('hit-flash'); // Add a CSS animation
        this.score = Math.max(0, this.score - 5);
        setTimeout(() => this.element.classList.remove('hit-flash'), 200);
    }
    getBounds() {
        return {
            x: this.position.x,
            y: this.position.y,
            width: 50, // Match your CSS
            height: 50
        };
    }
    //au cas ou y'en a pas render elsewhere c ici:
    render() {
        this.element.style.transform = `translate3d(${this.position.x}px, ${this.position.y}px, 0)`;
    }
    determine_directions() {
        if (keys['ArrowUp'] || keys['KeyW']) dy = -1;
        if (keys['ArrowDown'] || keys['KeyS']) dy = 1;
        if (keys['ArrowLeft'] || keys['KeyA']) dx = -1;
        if (keys['ArrowRight'] || keys['KeyD']) dx = 1;
        return dx, dy;
    }
    determine_if_player_dash() {
        if (keys['ShiftLeft'] || keys['ShiftRight']) {
            return true;
        }
        return false;
    }
    determine_if_player_shoot() {
        if (keys['Space']) {
            return true;
        }
        return false;
    }

}   
