import { getLoadProgress, onAssetsReady } from "./game.js";
import cheese_url from "./images/cheese.png";
import farmer_url from "./images/farmer.png";
import mouse_url from "./images/mouse.png";
import mousetrap_base_url from "./images/mousetrap_base.png";
import mousetrap_set_url from "./images/mousetrap_set.png";
import mousetrap_swing_url from "./images/mousetrap_swing.png";
import mousetrap_whack_url from "./images/mousetrap_whack.png";
import { Layer, Renderable } from "./renderable.js";

export class Splash extends Renderable {
    constructor() {
        super();
        this.progress = 0;
    }

    updateObject(currentTime) {
        this.progress = getLoadProgress();
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} context 
     * @param {number} layer 
     */
    renderObject(context, layer) {
        const { width, height } = context.canvas;

        const backgroundColor = "#edd08c";
        const progressBarBorder = "#657cee";
        const progressBarColor = "#bb1826";

        if (layer === Layer.BACKGROUND) {
            context.fillStyle = backgroundColor;
            context.fillRect(0, 0, width, height);
        } else if (layer === Layer.FOREGROUND) {
            const progressBarWidth = 600;
            const progressBarHeight = 80;
            const progressBarX = (width - progressBarWidth) / 2;
            const progressBarY = (height - progressBarHeight) / 2;
            const progressWidth = this.progress * progressBarWidth;

            context.save();
            context.translate(progressBarX, progressBarY);

            context.fillStyle = progressBarColor;
            context.fillRect(0, 0, progressWidth, progressBarHeight);

            context.strokeStyle = progressBarBorder;
            context.lineWidth = 3;
            context.strokeRect(0, 0, progressBarWidth, progressBarHeight);

            context.restore();
        }
    }
}

let assetsLoaded = 0;
let assetsToLoad = 0;

export function loadAssets() {
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
function getLoadProgress() {
    return assetsLoaded / assetsToLoad;
}