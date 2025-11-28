class Obstacle {
    constructor (x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
    }
}

const object = new Obstacle(10, 10, Type.BULLET)

const Type = Object.freeze({
    BULLET: enumValue("BULLET"),
    DROP: enumValue("DROP"),
});
