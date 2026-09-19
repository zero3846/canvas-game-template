import { enableDebug, registerDebugWatch } from "../core/debug.js";
import { getImage, loadImage } from "../core/images.js";
import { setFramerate, startMainLoop } from "../core/setup.js";
import { Direction } from "./direction.js";
import { advanceDirectionQueue, setupInputEventHandlers } from "./inputs.js";
import { getScene, Scene } from "./scene.js";
import { loadAssets } from "./splash.js";
import { isSameCoord, StageState } from "./stage.js";

enableDebug(true);
registerDebugWatch("keydown");

setFramerate(15);
startMainLoop(onFrameUpdate, onFrameRender);
setupInputEventHandlers();
loadAssets();

/**
 * Update the game state whenever the requested animation frame callback
 * is called.
 * @param {number} currentTime The time in milliseconds since page load.
 */
function onFrameUpdate(currentTime) {
    const scene = getScene();
    const { stage } = scene;
    if (stage == null) {
        return;
    }

    const { sprites } = stage;
    for (const sprite of sprites) {
        if (sprite.isAdvanceable()) {
            sprite.advanceFrame();
        }
    }
    
    advanceDirectionQueue()

    // Only check the game state when all sprites have
    // completed their moves.
    const { farmer } = stage;
    if (stage.stageState !== StageState.PLAY) {
        let spritesStoppedMoving = true;
        for (const sprite of sprites) {
            if (sprite.isAdvanceable()) {
                spritesStoppedMoving = false;
            }
        }

        if (spritesStoppedMoving) {
            onGameEnd();
        }
    }

    scene.update();
}

/**
 * Render the game based on the current game state.
 * @param {CanvasRenderingContext2D} context 
 */
function onFrameRender(context) {
    const scene = getScene();
    scene.renderLayers(context);
}

export function onAssetsReady() {
    const scene = getScene();
    scene.loadStage(0);
    setInterval(() => moveMice(), 1000);
}

function onGameEnd() {
    const scene = getScene();
    const { stage } = scene;
    const { stageState } = stage;

    if (stageState === StageState.WIN) {
        scene.banner.message = "You Win!";
    } else if (stageState === StageState.LOSE) {
        scene.banner.message = "You Lose!";
    }
}

export function moveFarmer(direction) {
    const { stage } = getScene();
    const { farmer, mousetraps } = stage;

    if (stage.isMoveAllowed(farmer, direction)) {
        farmer.beginMove(direction);
        stage.pickupTrap(farmer);
    }
}

function moveMice() {
    const { stage } = getScene();
    const { farmer, mice, mousetraps } = stage;

    const directions = [
        Direction.UP,
        Direction.DOWN,
        Direction.LEFT,
        Direction.RIGHT
    ];

    const liveTraps = mousetraps.filter(trap => trap.isSet());
    const livingMice = mice.filter(mouse => mouse.isAlive() && !mouse.isAdvanceable());

    for (const mouse of livingMice) {
        const allowed = directions.filter(
            direction => stage.isMoveAllowed(mouse, direction)
        );

        if (allowed.length < 1) {
            continue;
        }

        const choice = Math.floor(Math.random() * (allowed.length + 1));
        mouse.beginMove(allowed[choice]);

        for (const mousetrap of liveTraps) {
            if (isSameCoord(mouse, mousetrap)) {
                mousetrap.trigger();
                mouse.kill();
                break;
            }
        }
    }
}

export function layTrap() {
    const { stage } = getScene();
    const { farmer } = stage;

    stage.layTrap(farmer);
}