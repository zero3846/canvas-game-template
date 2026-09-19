import { Banner } from "./banner.js";
import { Layer, Renderable } from "./renderable.js";
import { Splash } from "./splash.js";
import { getStage } from "./stage-layouts.js";

export class Scene extends Renderable {
    constructor() {
        super();
        this.splash = new Splash();
        this.stage = undefined;
        this.banner = new Banner();
    }

    get children() {
        if (this.stage != null) {
            return [ this.stage, this.banner ];
        }
        return [ this.splash ];
    }

    loadStage(stageNum) {
        this.stage = getStage(stageNum);
    }

    /**
     * 
     * @param {number} currentTime 
     */
    updateObject(currentTime) {
        const { stage } = this;

        if (stage != null) {
            const canvas = document.querySelector("#main");

            const {
                width: bw,
                height: bh
            } = canvas.getBoundingClientRect();

            const {
                width: sw,
                height: sh
            } = stage;

            stage.x = (bw - sw) / 2;
            stage.y = (bh - sh) / 2;
        }
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} context 
     * @param {number} layer 
     */
    renderObject(context, layer) {
        const {
            width: bw,
            height: bh
        } = context.canvas.getBoundingClientRect();

        if (layer === Layer.BACKGROUND) {
            // Clear the canvas
            context.clearRect(0, 0, bw, bh);
        }
    }
}