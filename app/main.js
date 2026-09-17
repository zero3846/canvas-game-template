import { isDebugEnabled, registerDebugWatch, updateDebugWatch } from "./debug.js";
import { initGame, onFrameRender, onFrameUpdate } from "./game.js";

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

// The max frames-per-second to render the game at.
// Set to 0 or less if there should be no set maximum.
const fpsTarget = 5;

// The time to wait (in milliseconds) until rendering the next frame.
const frameTimeWait = 1.0 / fpsTarget * 1000;

// The number of frames rendered since the last FPS measurement.
let frameCount = 0;

// The last time (in milliseconds) that a frame was rendered.
let frameLastTime = 0;

function animate(currentTime) {
    const elapsedTime = currentTime - frameLastTime;

    onFrameUpdate(currentTime);

    if (fpsTarget > 0) {
        if (elapsedTime >= frameTimeWait) {
            frameLastTime = currentTime;
            frameCount++;
            onFrameRender(context);
        }
    } else {
        frameCount++;
        onFrameRender(context);
    }

    // Continue the render loop
    requestAnimationFrame(animate);
}

// Start the render loop
requestAnimationFrame(animate);

// Refresh the FPS measurement
registerDebugWatch("fps");
setInterval(() => {
    const fps = frameCount;
    if (isDebugEnabled()) {
        updateDebugWatch("fps", fps);
    }
    frameCount = 0;
}, 1000);

initGame();