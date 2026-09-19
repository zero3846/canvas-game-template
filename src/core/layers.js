let enumeration = 0;

/**
 * @typedef {number} RenderLayer
 */
export const RenderLayer = Object.freeze({
    BACKGROUND:         enumeration++,
    HIGH_BACKGROUND:    enumeration++,
    LOW_SPRITES:        enumeration++,
    SPRITES:            enumeration++,
    HIGH_SPRITES:       enumeration++,
    FOREGROUND:         enumeration++,
    HIGH_FOREGROUND:    enumeration++,

    FIRST:          0,
    LAST:           enumeration - 1,

    /**
     * Convert RenderLayer to string.
     * @param {RenderLayer} layer 
     */
    toString(layer) {
        switch (layer) {
            case Direction.BACKGROUND:      return "BACKGROUND";
            case Direction.HIGH_BACKGROUND: return "HIGH_BACKGROUND";
            case Direction.LOW_SPRITES:     return "LOW_SPRITES";
            case Direction.SPRITES:         return "SPRITES";
            case Direction.HIGH_SPRITES:    return "HIGH_SPRITES";
            case Direction.FOREGROUND:      return "FOREGROUND";
            case Direction.HIGH_FOREGROUND: return "HIGH_FOREGROUND";
        }
        return `INVALID(${layer})`;
    }
});