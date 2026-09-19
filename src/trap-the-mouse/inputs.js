import { enableDebug, isDebugEnabled, updateDebugWatch } from "../core/debug.js";
import { Direction } from "./direction.js";
import { getCurrentDirection, setCurrentDirection } from "./game.js";

/**
 * Sets up the input event handlers for the game.
 */
export function setupInputEventHandlers() {
    window.addEventListener('keydown', (e) => {
        e.preventDefault();
        onKeyDown(e);
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

    if (e.key === "`") {
        enableDebug(!isDebugEnabled());
    } else if (e.key === "ArrowUp") {
        setCurrentDirection(Direction.UP);
    } else if (e.key === "ArrowDown") {
        setCurrentDirection(Direction.DOWN);
    } else if (e.key === "ArrowLeft") {
        setCurrentDirection(Direction.LEFT);
    } else if (e.key === "ArrowRight") {
        setCurrentDirection(Direction.RIGHT);
    }

    if (isDebugEnabled()) {
        updateDebugWatch("direction", Direction.toString(getCurrentDirection()));
    }
}