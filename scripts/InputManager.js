export default class InputManager {
    constructor() {
        this.sources = [];
    }

    addSource(source) {
        this.sources.push(source);
    }

    isActionActive(action) {
        return this.sources.some((source) => source.isActionActive(action));
    }
}
