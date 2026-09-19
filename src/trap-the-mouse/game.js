import { enableDebug, registerDebugWatch } from "../core/debug.js";
import { getImage, loadImage } from "../core/images.js";
import { setFramerate, startMainLoop } from "../core/setup.js";
import { Direction } from "./direction.js";
import cheese_url from "./images/cheese.png";
import farmer_url from "./images/farmer.png";
import mouse_url from "./images/mouse.png";
import mousetrap_base_url from "./images/mousetrap_base.png";
import mousetrap_set_url from "./images/mousetrap_set.png";
import mousetrap_swing_url from "./images/mousetrap_swing.png";
import mousetrap_whack_url from "./images/mousetrap_whack.png";
import { setupInputEventHandlers } from "./inputs.js";
import { Scene } from "./scene.js";

/**
 * The current direction the player is headed.
 * @type {Direction}
 */
let currentDirection = Direction.NONE;

/** @type {number} */
let assetsLoaded = 0;

/** @type {number} */
let assetsToLoad = 0;

const scene = new Scene();

enableDebug(true);
registerDebugWatch("keydown");
registerDebugWatch("direction", Direction.toString(getCurrentDirection()));

setFramerate(15);
setupInputEventHandlers();
loadAssets();
startMainLoop(onFrameUpdate, onFrameRender);

/**
 * Load the game's assets.
 * @returns {Promise} A promise that resolves when all assets have been loaded.
 */
async function loadAssets() {
    const promises = [
        loadImage("mouse", mouse_url),
        loadImage("cheese", cheese_url),
        loadImage("farmer", farmer_url),
        loadImage("mousetrap_base", mousetrap_base_url),
        loadImage("mousetrap_set", mousetrap_set_url),
        loadImage("mousetrap_swing", mousetrap_swing_url),
        loadImage("mousetrap_whack", mousetrap_whack_url),
    ];

    assetsLoaded = 0;
    assetsToLoad = promises.length;
    const total = promises.length;
    const tracked = promises.map(p => p.then(r => {
        assetsLoaded++;
        return r;
    }))

    return Promise.all(tracked);
}

/** 
 * Gets the load progress of the assets.
 * @returns {number} The fraction of assets that are loaded.
 */
export function getLoadProgress() {
    return assetsLoaded / assetsToLoad;
}

/**
 * Update the game state whenever the requested animation frame callback
 * is called.
 * @param {number} currentTime The time in milliseconds since page load.
 */
function onFrameUpdate(currentTime) {

}

/**
 * Render the game based on the current game state.
 * @param {CanvasRenderingContext2D} context 
 */
function onFrameRender(context) {
    scene.renderLayers(context);
}

/**
 * Gets the current direction.
 * @returns {Direction} The current direction.
 */
export function getCurrentDirection() {
    return currentDirection;
}

/**
 * Sets the current direction.
 * @param {Direction} direction
 */
export function setCurrentDirection(direction) {
    currentDirection = direction;
}