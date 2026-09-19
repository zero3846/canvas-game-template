import { enableDebug, registerDebugWatch } from "../core/debug.js";
import { getImage, loadImage } from "../core/images.js";
import { setFramerate, startMainLoop } from "../core/setup.js";
import { Direction } from "./direction.js";
import { setupInputEventHandlers } from "./inputs.js";

import cheeseImageUrl from "./images/cheese.png";
import mouseImageUrl from "./images/mouse.png";

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
registerDebugWatch("keyup");
registerDebugWatch("direction", Direction.toString(getCurrentDirection()));

setFramerate(5);
setupInputEventHandlers();
loadAssets().then(r => assetsLoaded = true);
startMainLoop(onFrameUpdate, onFrameRender);

/**
 * Load the game's assets.
 * @returns {Promise} A promise that resolves when all assets have been loaded.
 */
async function loadAssets() {
    return Promise.all([
        loadImage("mouse", mouseImageUrl),
        loadImage("cheese", cheeseImageUrl),
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