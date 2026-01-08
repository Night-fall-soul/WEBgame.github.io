import DOMRender from "./DOMRender.js";
import { INPUT_BINDINGS } from "./Constants.js";
import InputManager from "./InputManager.js";
import KeyboardInput from "./KeyboardInput.js";
import Player from "./Player.js";

const render = new DOMRender();
// render.showContainer("game")
// render.showContainer("gameOver")
// render.showContainer("quickMenu")

const inputManager = new InputManager();
const keyboard = new KeyboardInput(INPUT_BINDINGS);
inputManager.addSource(keyboard);
