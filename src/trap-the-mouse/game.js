import { enableDebug, registerDebugWatch } from "../core/debug.js";
import { getImage, loadImage } from "../core/images.js";
import { setFramerate, startMainLoop } from "../core/setup.js";
import { Direction } from "./direction.js";
import cheese_url from "./images/cheese.png";
import farmer_url from "./images/farmer.png";
import mouse_url from "./images/mouse.png";
import mousetrap_base_url from "./images/mousetrap_base.png";
import mousetrap_set_url from "./images/mousetrap_set.png";
import mousetrap_swing_url from "./images/mousetrap_swing.png";
import mousetrap_whack_url from "./images/mousetrap_whack.png";
import { setupInputEventHandlers } from "./inputs.js";
import { Scene } from "./scene.js";
import { isSameCoord, StageState } from "./stage.js";

/**
 * The current direction the player is headed.
 * @type {Direction}
 */
let currentDirection = Direction.NONE;

const scene = new Scene();

let inputBuffer = [];
let inputLimit = 1;

enableDebug(true);
registerDebugWatch("keydown");
registerDebugWatch("direction", Direction.toString(getCurrentDirection()));

setFramerate(15);
setupInputEventHandlers();

const promises = [
    loadImage("mouse", mouse_url),
    loadImage("cheese", cheese_url),
    loadImage("farmer", farmer_url),
    loadImage("mousetrap_base", mousetrap_base_url),
    loadImage("mousetrap_set", mousetrap_set_url),
    loadImage("mousetrap_swing", mousetrap_swing_url),
    loadImage("mousetrap_whack", mousetrap_whack_url),
];

let assetsLoaded = 0;
let assetsToLoad = promises.length;
const tracked = promises.map(p => p.then(r => {
    assetsLoaded++;
    return r;
}))

Promise.all(tracked).then(r => {
    onAssetsReady();
});

startMainLoop(onFrameUpdate, onFrameRender);

/** 
 * Gets the load progress of the assets.
 * @returns {number} The fraction of assets that are loaded.
 */
export function getLoadProgress() {
    return assetsLoaded / assetsToLoad;
}

/**
 * Update the game state whenever the requested animation frame callback
 * is called.
 * @param {number} currentTime The time in milliseconds since page load.
 */
function onFrameUpdate(currentTime) {
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

    const { farmer } = stage;
    if (!farmer.isAdvanceable() && inputBuffer.length > 0) {
        const direction = inputBuffer.pop();
        moveFarmer(direction);
    }

    // Only check the game state when all sprites have
    // completed their moves.
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
    scene.renderLayers(context);
}

function onAssetsReady() {
    scene.loadStage(0);
    setInterval(() => moveMice(), 1000);
}

/**
 * Gets the current direction.
 * @returns {Direction} The current direction.
 */
export function getCurrentDirection() {
    return currentDirection;
}

/**
 * Sets the current direction.
 * @param {Direction} direction
 */
export function setCurrentDirection(direction) {
    currentDirection = direction;
}

function onDirectionInput(direction) {
    const { stage } = scene;
    if (stage == null) {
        return;
    }

    const { farmer, mousetraps } = stage;
    if (farmer.isAdvanceable() || inputBuffer.length > 0) {
        // Limit the queued inputs or it starts to feel very laggy.
        if (inputBuffer.length < inputLimit) {
            inputBuffer.push(direction);
        }
        return;
    }

    moveFarmer(direction);
}

function onGameEnd() {
    const { stage } = scene;
    const { stageState } = stage;

    if (stageState === StageState.WIN) {
        scene.banner.message = "You Win!";
    } else if (stageState === StageState.LOSE) {
        scene.banner.message = "You Lose!";
    }
}

function moveFarmer(direction) {
    const { stage } = scene;
    const { farmer, mousetraps } = stage;

    if (stage.isMoveAllowed(farmer, direction)) {
        farmer.beginMove(direction);
        stage.pickupTrap(farmer);
    }
}

function moveMice() {
    const { stage } = scene;
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

function layTrap() {
    const { stage } = this.scene;
    const { farmer } = stage;

    stage.layTrap(farmer);
}