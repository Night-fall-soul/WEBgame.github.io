export function playerSize(level) {
    return (30 * 1 ** level, 50 * 1.1 ** level);
}

export const INPUT_BINDINGS = {
    KeyW: "moveUp",
    ArrowUp: "moveUp",

    KeyS: "moveDown",
    ArrowDown: "moveDown",

    KeyA: "moveLeft",
    ArrowLeft: "moveLeft",

    KeyD: "moveRight",
    ArrowRight: "moveRight",

    ShiftLeft: "dash",
    KeyL: "dash",

    KeyK: "shoot",
    ControlLeft: "shoot",
    Space: "shoot",

    Escape: "pause"
};
