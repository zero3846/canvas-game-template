/**
 * @typedef {number} Direction
 */
export const Direction = Object.freeze({
    NONE:   0,
    UP:     1,
    DOWN:   2,
    LEFT:   3,
    RIGHT:  4,

    /**
     * Convert direction to string.
     * @param {Direction} direction 
     */
    toString(direction) {
        switch (direction) {
            case Direction.NONE:    return "NONE";
            case Direction.UP:      return "UP";
            case Direction.DOWN:    return "DOWN";
            case Direction.LEFT:    return "LEFT";
            case Direction.RIGHT:   return "RIGHT";
        }
        return `INVALID(${direction})`;
    }
});