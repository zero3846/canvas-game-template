import { enableDebug, isDebugEnabled, updateDebugWatch } from "./debug.js";
import { decomposeDirection, Direction, getCurrentDirection, setCurrentDirection } from "./game.js";

let leftRight = 0;
let upDown = 0;

/**
 * Sets up the input event handlers for the game.
 */
export function setupInputEventHandlers() {
    window.addEventListener('keydown', (e) => {
        e.preventDefault();
        onKeyDown(e);
    });
    window.addEventListener('keyup', (e) => {
        e.preventDefault();
        onKeyUp(e);
    });
}

/**
 * The callback method for 'keydown' events.
 * @param {KeyboardEvent} e 
 */
function onKeyDown(e) {
    if (isDebugEnabled()) {
        updateDebugWatch("keydown", e.key);
    }

    const currentDirection = getCurrentDirection();
    const [ nsAxis, weAxis ] = decomposeDirection(currentDirection);

    if (e.key === "ArrowUp") {
        setCurrentDirection(
            weAxis === Direction.WEST ? Direction.NORTHWEST
            : weAxis === Direction.EAST ? Direction.NORTHEAST
            : Direction.NORTH
        );
    } else if (e.key === "ArrowDown") {
        setCurrentDirection(
            weAxis === Direction.WEST ? Direction.SOUTHWEST
            : weAxis === Direction.EAST ? Direction.SOUTHEAST
            : Direction.SOUTH
        );
    } else if (e.key === "ArrowLeft") {
        setCurrentDirection(
            nsAxis === Direction.NORTH ? Direction.NORTHWEST
            : nsAxis === Direction.SOUTH ? Direction.SOUTHWEST
            : Direction.WEST
        );
    } else if (e.key === "ArrowRight") {
        setCurrentDirection(
            nsAxis === Direction.NORTH ? Direction.NORTHEAST
            : nsAxis === Direction.SOUTH ? Direction.SOUTHEAST
            : Direction.EAST
        );
    }

    if (isDebugEnabled()) {
        updateDebugWatch("direction", (Direction.toString(getCurrentDirection())));
    }
}

/**
 * The callback method for 'keyup' events.
 * @param {KeyboardEvent} e 
 */
function onKeyUp(e) {
    if (isDebugEnabled()) {
        updateDebugWatch("keyup", e.key);
    }

    const currentDirection = getCurrentDirection();
    const [ nsAxis, weAxis ] = decomposeDirection(currentDirection);

    if (e.key === "`") {
        enableDebug(!isDebugEnabled());
    } else if (e.key === "ArrowUp") {
        setCurrentDirection(
            weAxis === Direction.WEST ? Direction.WEST
            : weAxis === Direction.EAST ? Direction.EAST
            : Direction.NONE
        );
    } else if (e.key === "ArrowDown") {
        setCurrentDirection(
            weAxis === Direction.WEST ? Direction.WEST
            : weAxis === Direction.EAST ? Direction.EAST
            : Direction.NONE
        );
    } else if (e.key === "ArrowLeft") {
        setCurrentDirection(
            nsAxis === Direction.NORTH ? Direction.NORTH
            : nsAxis === Direction.SOUTH ? Direction.SOUTH
            : Direction.NONE
        );
    } else if (e.key === "ArrowRight") {
        setCurrentDirection(
            nsAxis === Direction.NORTH ? Direction.NORTH
            : nsAxis === Direction.SOUTH ? Direction.SOUTH
            : Direction.NONE
        );
    }

    if (isDebugEnabled()) {
        updateDebugWatch("direction", Direction.toString(getCurrentDirection()));
    }
}