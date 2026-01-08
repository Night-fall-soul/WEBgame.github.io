export default class KeyboardInput {
    constructor() {
        this.bindingMap = bindingMap;
        // Objeto para guardar el estado de las acciones: { 'jump': true, 'moveUp': false }
        this.activeActions = {};
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
    /* Re-edit 2 hours later: i realized we weren't doing DI on the
      input, so i changed a bit the workflow on this dependency. Now
      should work as expected. :D*/

    init() {
        window.addEventListener("keydown", (e) => {
            const action = this.bindingMap[e.code];
            if (action) {
                this.activeActions[action] = true;
            }
        });

        window.addEventListener("keyup", (e) => {
            const action = this.bindingMap[e.code];
            if (action) {
                this.activeActions[action] = false;
            }
        });
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
