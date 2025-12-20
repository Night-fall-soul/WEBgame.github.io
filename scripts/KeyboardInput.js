export default class KeyboardInput {
    keyStates = new Map();
    keyPressCallbacks = new Map();
    keys = {};

    constructor() {
        window.addEventListener('keydown', (e) => this.keys[e.key] = true);
        window.addEventListener('keyup', (e) => this.keys[e.key] = false);
    }

    isKeyPressed(key) {
        return !!this.keys[key];
    }

    init() {
        widnow.addEventListener('keydown', this.handleKeyDown.bind(this));
        // ..
    }

    handleKeyDown(event) {
        // updates state:
        // key in true.
        // updates callbacks:
        // execute callbacks registered to that key
    }

    handleKeyUp(event) {
        // idem but inversed 
    }

    isKeyPressed(keyName) {
        // returns boolean
    }

    onKeyDown(keyName, callback) {
        // callback is a function "what we will do whenever this key is pressed"
    }
}
