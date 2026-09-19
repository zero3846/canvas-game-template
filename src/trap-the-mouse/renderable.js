import { RenderLayer } from "../core/layers";

export class Renderable {
    constructor() {
        /** @type {number} */
        this.x = 0;

        /** @type {number} */
        this.y = 0;
    }

    /** @type {Renderable[]} children */
    get children() {
        return [];
    }

    /**
     * 
     * @param {number} currentTime
     */
    update(game, currentTime) {
        this.updateObject(game, currentTime);
        this.updateChildren(game, currentTime);
    }

    /**
     * 
     * @param {number} currentTime
     */
    updateObject(game, currentTime) {}

    /**
     * 
     * @param {number} currentTime
     */
    updateChildren(game, currentTime) {
        for (const child of this.children) {
            child.update(game, currentTime);
        }
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} context
     * @param {number} layer 
     */
    render(context, layer) {
        this.renderObject(context, layer);
        this.renderChildren(context, layer);
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} context
     * @param {number} layer 
     */
    renderObject(context, layer) {}

    /**
     * 
     * @param {CanvasRenderingContext2D} context 
     * @param {number} layer 
     */
    renderChildren(context, layer) {
        for (const child of this.children) {
            context.save();
            context.translate(child.x, child.y);
            child.render(context, layer);
            context.restore();
        }
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} context
     */
    renderLayers(context) {
        for (let layer = RenderLayer.FIRST; layer <= RenderLayer.LAST; ++layer) {
            this.render(context, layer);
        }
    }
}