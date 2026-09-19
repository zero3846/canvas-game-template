import { enableDebug, registerDebugWatch } from "../core/debug.js";
import { setFramerate, startMainLoop } from "../core/setup.js";
import { Direction, getCurrentDirection } from "./direction.js";
import { setupInputEventHandlers } from "./inputs.js";
import { RenderLayer } from "./layers.js";
import { loadAssets } from "./load-screen.js";
import { renderScene } from "./scene.js";

enableDebug(true);
registerDebugWatch("keydown");
registerDebugWatch("keyup");
registerDebugWatch("direction", Direction.toString(getCurrentDirection()));

setFramerate(5);
startMainLoop(onFrameUpdate, onFrameRender);

setupInputEventHandlers();
loadAssets();

/**
 * Render the game based on the current game state.
 * @param {CanvasRenderingContext2D} context 
 */
function onFrameRender(context) {
    for (let layer = RenderLayer.FIRST; layer <= RenderLayer.LAST; ++layer) {
        renderScene(context, layer);
    }
}

/**
 * Update the game state whenever the requested animation frame callback
 * is called.
 * @param {number} currentTime The time in milliseconds since page load.
 */
function onFrameUpdate(currentTime) {
    // Update the game's state according to the currentTime
}

export function onAssetsReady() {
    // Called when assets are ready.
}