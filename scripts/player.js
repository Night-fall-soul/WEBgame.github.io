class Player {
    constructor(name, vitesse, position) {
        this.name = name;
        this.score = 0;
        this.vitesse = vitesse;
        this.position = position;
        this.jett_dash = game_level == 3 ? true : false;
    }

    update() {
        // updates everything ok
    }

    move(direction) {
        // calculates the new direction of movement
    }

    dash() {
        // Initializes a movement of high velocity
    }

    // shoot() {}
    
    canDash() {

    }

    hit() {
        //when the colissionmanager detects a 
    }

    getBounds() {
        // get player dimensions and position delimitation
            
    }
}
