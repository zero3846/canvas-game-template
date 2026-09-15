import { Direction, getCurrentDirection, initGame, onFrameRender, onFrameUpdate } from "./game.js";

/**
 * The max frames-per-second to render the game at.
 * Set to undefined if there should be no set maximum.
 * @type {number|undefined}
 */
const fpsTarget = 5;

/**
 * The time to wait (in milliseconds) until rendering the next frame.
 * This should be undefined if 'fpsTarget' is undefined.
 * @type {number|undefined}
 */
const frameTimeWait = fpsTarget != null ? 1.0 / fpsTarget * 1000 : undefined;

/**
 * Enable/disable logging of debug information.
 * @type {boolean}
 */
let debug = false;

/**
 * The measured frames-per-second.
 * @type {number}
 */
let fps = 0;

/**
 * The number of frames rendered since the last FPS measurement.
 * @type {number}
 */
let frameCount = 0;

/**
 * The last time (in milliseconds) that a frame was rendered.
 * @type {number}
 */
let frameLastTime = 0;

/**
 * The rendering context of the main canvas.
 * @type {CanvasRenderingContext2D}
 */
let context;

// Start the game loop.
start();

/**
 * Starts the rendering for the game. This method defines the rendering loop.
 * @param {HTMLCanvasElement} canvas The canvas to render the game onto.
 */
function start() {
    const overlay = document.querySelector("#debugOverlay");
    overlay.style.visibility = debug ? "visible" : "hidden";
    
    registerDebugWatch("fps");

    const canvas = document.querySelector("#main");

    context = canvas.getContext("2d", {
        alpha: false
    });

    // Adjust for high-density displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    context.scale(dpr, dpr);

    function animate(currentTime) {
        const elapsedTime = currentTime - frameLastTime;

        onFrameUpdate(currentTime);

        if (frameTimeWait) {
            if (elapsedTime >= frameTimeWait) {
                frameLastTime = currentTime;
                frameCount++;
                onFrameRender(context);
            }
        } else {
            frameCount++;
            onFrameRender(context);
        }

        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    // Refresh the FPS measurement
    setInterval(() => {
        fps = frameCount;
        if (isDebugEnabled()) {
            updateDebugWatch("fps", fps);
        }
        frameCount = 0;
    }, 1000);

    initGame();
}

/**
 * Gets the measured frames-per-second.
 * @returns {number} The measured frames-per-second.
 */
export function getFPS() {
    return fps;
}

/**
 * Enable/disable debug mode.
 * @param {boolean} enabled Set to true to enable debug mode.
 */
export function enableDebug(enabled) {
    debug = enabled;
    const overlay = document.querySelector("#debugOverlay");
    overlay.style.visibility = enabled ? "visible" : "hidden";
}

/**
 * Determines whether the debug mode is enabled.
 * @returns {boolean} true if debug mode is enabled.
 */
export function isDebugEnabled() {
    return debug;
}

/**
 * Escapes a value for use in an HTML element's text content.
 * @param {any} value 
 * @returns The escaped value.
 */
function escapeWatchValue(value) {
    return value === undefined ? "undefined"
        : value === null ? "null"
        : value.toString().replaceAll("\n", "<br>");
}

/**
 * Adds a line in the debug overlay to display a specific value.
 * @param {string} id       The ID of the HTML element containing the value to display.
 * @param {any} initValue   The initial value to display.
 * @param {string} label    The label to display for the value. Defaults to the given ID.
 */
export function registerDebugWatch(id, initValue, label = id) {
    const escapedValue = escapeWatchValue(initValue);

    const watchElem = document.createElement("div");
    watchElem.innerHTML = `${label}: <span id="${id}">${escapedValue}</span>`;

    const overlay = document.querySelector("#debugOverlay");
    overlay.appendChild(watchElem);
}

/**
 * Updates the value to display in the debug overlay.
 * @param {string} id       The ID of the HTML element containing the value to display.
 * @param {any} value       The value to display.
 */
export function updateDebugWatch(id, value = "") {
    const watchValueElem = document.querySelector("#" + id);
    if (watchValueElem != null) {
        watchValueElem.textContent = escapeWatchValue(value);
    }
}