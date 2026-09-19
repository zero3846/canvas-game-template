import { RenderLayer } from "../core/layers.js";
import { Renderable } from "./renderable.js";

export class Banner extends Renderable {
    constructor() {
        super();
        this.message = undefined;
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} context 
     * @param {RenderLayer} layer 
     */
    renderObject(context, layer) {
        const { width, height } = context.canvas;

        const backgroundColor = "#eec832";
        const borderColor = "#bb1826";
        const textColor = borderColor;

        if (layer === RenderLayer.FOREGROUND && this.message != null) {
            context.font = "bold 30px Arial";

            const metrics = context.measureText(this.message);
            const messageWidth = metrics.width;
            const messageHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

            const padding = 100;
            const bannerWidth = messageWidth + 100;
            const bannerHeight = messageHeight + 20;
            const bannerX = (width - bannerWidth) / 2;
            const bannerY = (height - bannerHeight) / 2;

            context.save();
            context.translate(bannerX, bannerY);

            context.fillStyle = backgroundColor;
            context.fillRect(0, 0, bannerWidth, bannerHeight);

            context.strokeStyle = borderColor;
            context.lineWidth = 8;
            context.strokeRect(0, 0, bannerWidth, bannerHeight);

            context.fillStyle = textColor;
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillText(this.message, bannerWidth / 2, bannerHeight / 2);

            context.restore();
        }
    }
}