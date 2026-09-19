let enumeration = 0;

/**
 * @typedef {number} RenderLayer
 */
export const RenderLayer = Object.freeze({
    BACKGROUND:     enumeration++,
    SPRITES:        enumeration++,
    FOREGROUND:     enumeration++,

    FIRST:          0,
    LAST:           enumeration - 1,

    /**
     * Convert RenderLayer to string.
     * @param {RenderLayer} layer 
     */
    toString(layer) {
        switch (layer) {
            case Direction.BACKGROUND:  return "BACKGROUND";
            case Direction.SPRITES:     return "SPRITES";
            case Direction.FOREGROUND:  return "FOREGROUND";
        }
        return `INVALID(${layer})`;
    }
});