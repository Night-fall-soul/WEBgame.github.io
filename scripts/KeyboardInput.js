export default class KeyboardInput {
    constructor() {
        // i create a map and some event listeners to use them
        this.keys = {};
        this.init();
    }

    isKeyPressed(key) {
        return !!this.keys[key];
    }

    /* I really thing this is bullshit seeing how amine has coded player,
      but i gotta say I REALLY LIKE what amine did because it's simpler
      and i HATE event listeners (c gang) so better if i ignore this part
      (ill comment everything bc im kinda afraid that amine thing won't
      work but hope is the thing that lasts longer) */

    init() {
        window.addEventListener("keydown", (e) => (this.keys[e.key] = true));
        window.addEventListener("keyup", (e) => (this.keys[e.key] = false));
    }
    /*
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
    */
}
