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
    }

    dash() {
        // Initializes a movement of high velocity
    }

    // shoot() {}

    canDash() {
        return this.jett_dash
    }

    hit() {
        //when the colissionmanager detects a collision
    }

    getBounds() {
        // get player dimensions and position delimitation

    }
}
