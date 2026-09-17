import { enableDebug, registerDebugWatch } from "./debug.js";
import { getImage, loadImage } from "./images.js";
import { setupInputEventHandlers } from "./inputs.js";

/**
 * @typedef {number} Direction
 */
export const Direction = Object.freeze({
    NONE:       0,
    NORTH:      1,
    SOUTH:      2,
    WEST:       3,
    EAST:       4,
    NORTHWEST:  5,
    NORTHEAST:  6,
    SOUTHWEST:  7,
    SOUTHEAST:  8,

    /**
     * Convert direction to string.
     * @param {Direction} direction 
     */
    toString(direction) {
        switch (direction) {
            case Direction.NONE:        return "NONE";
            case Direction.NORTH:       return "NORTH";
            case Direction.SOUTH:       return "SOUTH";
            case Direction.WEST:        return "WEST";
            case Direction.EAST:        return "EAST";
            case Direction.NORTHWEST:   return "NORTHWEST";
            case Direction.NORTHEAST:   return "NORTHEAST";
            case Direction.SOUTHWEST:   return "SOUTHWEST";
            case Direction.SOUTHEAST:   return "SOUTHEAST";
        }
        return `INVALID(${direction})`;
    }
});

/**
 * The current direction the player is headed.
 * @type {Direction}
 */
let currentDirection = Direction.NONE;

/**
 * A flag to indicate whether all assets are loaded.
 */
let assetsLoaded = false;

export function initGame() {
    enableDebug(true);
    registerDebugWatch("keydown");
    registerDebugWatch("keyup");
    registerDebugWatch("direction", Direction.toString(getCurrentDirection()));

    setupInputEventHandlers();
    
    loadAssets().then(r => assetsLoaded = true);
}

/**
 * Load the game's assets.
 * @returns {Promise} A promise that resolves when all assets have been loaded.
 */
export async function loadAssets() {
    return Promise.all([
        loadImage("mouse", "assets/mouse.png"),
        loadImage("cheese", "assets/cheese.png"),
    ]);
}

/**
 * Update the game state whenever the requested animation frame callback
 * is called.
 * @param {number} currentTime The time in milliseconds since page load.
 */
export function onFrameUpdate(currentTime) {

}

/**
 * Render the game based on the current game state.
 * @param {CanvasRenderingContext2D} context 
 */
export function onFrameRender(context) {
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

/**
 * Decomposes a direction according to dimension.
 * @param {Direction} direction 
 * @returns {Direction[]} A two-element array containing the decomposed
 * directions. The first element is the north-south dimension and can only
 * have the values NORTH, SOUTH, or NONE. The second element is the east-west
 * dimension and can only have the values EAST, WEST, or NONE.
 */
export function decomposeDirection(direction) {
    const movingNorth = currentDirection === Direction.NORTH
        || currentDirection === Direction.NORTHWEST
        || currentDirection === Direction.NORTHEAST;

    const movingSouth = currentDirection === Direction.SOUTH
        || currentDirection === Direction.SOUTHWEST
        || currentDirection === Direction.SOUTHEAST;

    const movingWest = currentDirection === Direction.WEST
        || currentDirection === Direction.NORTHWEST
        || currentDirection === Direction.SOUTHWEST;

    const movingEast = currentDirection === Direction.EAST
        || currentDirection === Direction.NORTHEAST
        || currentDirection === Direction.SOUTHEAST;

    return [
        movingNorth ? Direction.NORTH : movingSouth ? Direction.SOUTH : Direction.NONE,
        movingWest ? Direction.WEST : movingEast ? Direction.EAST : Direction.NONE
    ];
}