import { loadImage } from "../core/images";
import { onAssetsReady } from "./game";
import cheese_url from "./images/cheese.png";
import mouse_url from "./images/mouse.png";
import { RenderLayer } from "./layers";

let assetsLoaded = 0;
let assetsToLoad = 0;

/**
 * Loads the game's assets.
 */
export function loadAssets() {
    const promises = [
        loadImage("mouse", mouse_url),
        loadImage("cheese", cheese_url),
    ];

    assetsLoaded = 0;
    assetsToLoad = promises.length;
    const tracked = promises.map(p => p.then(r => {
        assetsLoaded++;
        return r;
    }))

    Promise.all(tracked).then(r => {
        onAssetsReady();
    });
}

/** 
 * Gets the load progress of the assets.
 * @returns {number} The fraction of assets that are loaded.
 */
export function getLoadProgress() {
    return assetsLoaded / assetsToLoad;
}

/**
 * Gets whether all assets are loaded.
 * @returns {boolean} true if getLoadProgress() returns 1.
 */
export function assetsReady() {
    return assetsLoaded === assetsToLoad;
}

/**
 * Render the load screen.
 * @param {CanvasRenderingContext2D} context 
 * @param {RenderLayer} layer
 */
export function renderLoadScreen(context, layer) {
    if (layer === RenderLayer.FOREGROUND) {
        let x = 128;
        let y = 128;

        context.font = "bold 18pt Arial";
        context.fillStyle = "red";
        context.fillText("Assets not yet loaded.", x, y);
    }
}