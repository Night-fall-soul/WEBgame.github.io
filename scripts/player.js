class Player {
    constructor(name, vitesse, position) {
        this.name = name;
        this.score = 0;
        this.vitesse = vitesse;
        this.position = position;
        this.jett_dash = game_level == 3 ? true : false;
    }
    movement() {
        this.position[0]
    }
    activation_dash(game_level) {
        if (game_level == 3) {
            this.jett_dash = true;
        }
    }
}
