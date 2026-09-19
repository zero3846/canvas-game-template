import { enableDebug, registerDebugWatch } from "../core/debug.js";
import { getImage, loadImage } from "../core/images.js";
import { setFramerate, startMainLoop } from "../core/setup.js";
import { Direction } from "./direction.js";
import { setupInputEventHandlers } from "./inputs.js";

import cheese_url from "./images/cheese.png";
import farmer_url from "./images/farmer.png";
import mouse_url from "./images/mouse.png";
import mousetrap_base_url from "./images/mousetrap_base.png";
import mousetrap_set_url from "./images/mousetrap_set.png";
import mousetrap_swing_url from "./images/mousetrap_swing.png";
import mousetrap_whack_url from "./images/mousetrap_whack.png";

/**
 * The current direction the player is headed.
 * @type {Direction}
 */
let currentDirection = Direction.NONE;

/**
 * A flag to indicate whether all assets are loaded.
 */
let assetsLoaded = false;

enableDebug(true);
registerDebugWatch("keydown");
registerDebugWatch("direction", Direction.toString(getCurrentDirection()));

setFramerate(15);
setupInputEventHandlers();
loadAssets().then(r => assetsLoaded = true);
startMainLoop(onFrameUpdate, onFrameRender);

/**
 * Load the game's assets.
 * @returns {Promise} A promise that resolves when all assets have been loaded.
 */
async function loadAssets() {
    return Promise.all([
        loadImage("mouse", mouse_url),
        loadImage("cheese", cheese_url),
        loadImage("farmer", farmer_url),
        loadImage("mousetrap_base", mousetrap_base_url),
        loadImage("mousetrap_set", mousetrap_set_url),
        loadImage("mousetrap_swing", mousetrap_swing_url),
        loadImage("mousetrap_whack", mousetrap_whack_url),
    ]);
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
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    let x = 128;
    let y = 128;

    if (assetsLoaded) {
        const imageSize = 48;

        let image = getImage("mouse");
        if (image != null) {
            context.drawImage(image, x, y, imageSize, imageSize);
            x += imageSize;
        }

        image = getImage("cheese");
        if (image != null) {
            context.drawImage(image, x, y, imageSize, imageSize);
            x += imageSize;
        }
    } else {
        context.font = "bold 18pt Arial";
        context.fillStyle = "red";
        context.fillText("Assets not yet loaded.", x, y);
    }
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