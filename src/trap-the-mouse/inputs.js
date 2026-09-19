import { enableDebug, isDebugEnabled, updateDebugWatch } from "../core/debug.js";
import { Direction } from "./direction.js";
import { layTrap, moveFarmer } from "./game.js";
import { getScene } from "./scene.js";


let directionQueue = [];
let directionQueueLimit = 1;

/**
 * Sets up the input event handlers for the game.
 */
export function setupInputEventHandlers() {
    window.addEventListener('keydown', (e) => {
        e.preventDefault();
        onKeyDown(e);
    });
}

export function advanceDirectionQueue() {
    const { stage } = getScene();
    const { farmer } = stage;
    if (!farmer.isAdvanceable() && directionQueue.length > 0) {
        const direction = directionQueue.pop();
        moveFarmer(direction);
    }
}

function onDirectionInput(direction) {
    const { stage } = getScene();
    if (stage == null) {
        return;
    }

    const { farmer, mousetraps } = stage;
    if (farmer.isAdvanceable() || directionQueue.length > 0) {
        // Limit the queued inputs or it starts to feel very laggy.
        if (directionQueue.length < directionQueueLimit) {
            directionQueue.push(direction);
        }
        return;
    }

    moveFarmer(direction);
}

/**
 * The callback method for 'keydown' events.
 * @param {KeyboardEvent} e 
 */
function onKeyDown(e) {
    if (isDebugEnabled()) {
        updateDebugWatch("keydown", e.key);
    }

    if (e.key === "`") {
        enableDebug(!isDebugEnabled());
    } else if (e.key === "ArrowUp") {
        onDirectionInput(Direction.UP);
    } else if (e.key === "ArrowDown") {
        onDirectionInput(Direction.DOWN);
    } else if (e.key === "ArrowLeft") {
        onDirectionInput(Direction.LEFT);
    } else if (e.key === "ArrowRight") {
        onDirectionInput(Direction.RIGHT);
    } else if (e.key === "f") {
        layTrap();
    }
}