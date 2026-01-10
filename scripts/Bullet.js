class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 5;
        this.h = 10;
        this.speed = 10;
    }

    update() {
        this.y -= this.speed;
    }

    show() {
        fill(255, 255, 0);
        noStroke();
        rect(this.x, this.y, this.w, this.h);
    }

    offscreen() {
        return this.y < 0;
    }
}