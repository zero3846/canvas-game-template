/**
 * @typedef {number} Direction
 */
export const Direction = Object.freeze({
    NONE:       0,
    NORTH:      1,
    SOUTH:      2,
    WEST:       3,
    EAST:       4,
    NORTHWEST:  5,
    NORTHEAST:  6,
    SOUTHWEST:  7,
    SOUTHEAST:  8,

    /**
     * Convert direction to string.
     * @param {Direction} direction 
     */
    toString(direction) {
        switch (direction) {
            case Direction.NONE:        return "NONE";
            case Direction.NORTH:       return "NORTH";
            case Direction.SOUTH:       return "SOUTH";
            case Direction.WEST:        return "WEST";
            case Direction.EAST:        return "EAST";
            case Direction.NORTHWEST:   return "NORTHWEST";
            case Direction.NORTHEAST:   return "NORTHEAST";
            case Direction.SOUTHWEST:   return "SOUTHWEST";
            case Direction.SOUTHEAST:   return "SOUTHEAST";
        }
        return `INVALID(${direction})`;
    }
});

/**
 * Decomposes a direction according to dimension.
 * @param {Direction} direction 
 * @returns {Direction[]} A two-element array containing the decomposed
 * directions. The first element is the north-south dimension and can only
 * have the values NORTH, SOUTH, or NONE. The second element is the east-west
 * dimension and can only have the values EAST, WEST, or NONE.
 */
export function decomposeDirection(direction) {
    const movingNorth = currentDirection === Direction.NORTH
        || currentDirection === Direction.NORTHWEST
        || currentDirection === Direction.NORTHEAST;

    const movingSouth = currentDirection === Direction.SOUTH
        || currentDirection === Direction.SOUTHWEST
        || currentDirection === Direction.SOUTHEAST;

    const movingWest = currentDirection === Direction.WEST
        || currentDirection === Direction.NORTHWEST
        || currentDirection === Direction.SOUTHWEST;

    const movingEast = currentDirection === Direction.EAST
        || currentDirection === Direction.NORTHEAST
        || currentDirection === Direction.SOUTHEAST;

    return [
        movingNorth ? Direction.NORTH : movingSouth ? Direction.SOUTH : Direction.NONE,
        movingWest ? Direction.WEST : movingEast ? Direction.EAST : Direction.NONE
    ];
}