export default class KeyboardInput {
    constructor(bindingMap) {
        this.bindingMap = bindingMap;
        this.activeActions = {};
        this.init();
    }

    /*
    isKeyPressed(key) {
        return !!this.keys[key];
    }*/

    /* 
      .
      .
      .
      . */

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

    isActionActive(action) {
        return !!this.activeActions[action];
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
