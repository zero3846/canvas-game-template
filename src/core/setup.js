import { isDebugEnabled, registerDebugWatch, updateDebugWatch } from "./debug.js";

/** @type {HTMLElement} */
const overlay = document.querySelector("#debugOverlay");

// Initialize the overlay's visibility
overlay.style.visibility = isDebugEnabled() ? "visible" : "hidden";

/** @type {HTMLCanvasElement} */
const canvas = document.querySelector("#main");

/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext("2d", {
    alpha: false
});

// Adjust for high-density displays
const dpr = window.devicePixelRatio || 1;
canvas.width = canvas.clientWidth * dpr;
canvas.height = canvas.clientHeight * dpr;
context.scale(dpr, dpr);

// The time to wait (in milliseconds) until rendering the next frame.
// 200 ms equates to a framerate of 5 fps.
let frameTimeWait = 200;

// The number of frames rendered since the last FPS measurement.
let frameCount = 0;

// The last time (in milliseconds) that a frame was rendered.
let frameLastTime = 0;

// Refresh the FPS measurement
registerDebugWatch("fps");
setInterval(() => {
    const fps = frameCount;
    if (isDebugEnabled()) {
        updateDebugWatch("fps", fps);
    }
    frameCount = 0;
}, 1000);

export function startMainLoop(onFrameUpdate, onFrameRender) {
    function animate(currentTime) {
        const elapsedTime = currentTime - frameLastTime;

        onFrameUpdate(currentTime);

        if (elapsedTime >= frameTimeWait) {
            frameLastTime = currentTime;
            frameCount++;
            onFrameRender(context);
        }

        // Continue the render loop
        requestAnimationFrame(animate);
    }

    // Start the render loop
    requestAnimationFrame(animate);
}

/**
 * Sets the target framerate target for the game.
 * @param {number} target The target framerate in frames-per-second.
 */
export function setFramerate(framerate) {
    frameTimeWait = 1.0 / framerate * 1000;
}