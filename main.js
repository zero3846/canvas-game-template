import { isDebugEnabled, registerDebugWatch, updateDebugWatch } from "./debug.js";
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
    overlay.style.visibility = isDebugEnabled() ? "visible" : "hidden";
    
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