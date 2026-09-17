/**
 * Enable/disable logging of debug information.
 * @type {boolean}
 */
let debug = false;

/**
 * Enable/disable debug mode.
 * @param {boolean} enabled Set to true to enable debug mode.
 */
export function enableDebug(enabled) {
    debug = enabled;
    const overlay = document.querySelector("#debugOverlay");
    overlay.style.visibility = enabled ? "visible" : "hidden";
}

/**
 * Determines whether the debug mode is enabled.
 * @returns {boolean} true if debug mode is enabled.
 */
export function isDebugEnabled() {
    return debug;
}

/**
 * Escapes a value for use in an HTML element's text content.
 * @param {any} value 
 * @returns The escaped value.
 */
function escapeWatchValue(value) {
    return value === undefined ? "undefined"
        : value === null ? "null"
        : value.toString().replaceAll("\n", "<br>");
}

/**
 * Adds a line in the debug overlay to display a specific value.
 * @param {string} id       The ID of the HTML element containing the value to display.
 * @param {any} initValue   The initial value to display.
 * @param {string} label    The label to display for the value. Defaults to the given ID.
 */
export function registerDebugWatch(id, initValue, label = id) {
    const escapedValue = escapeWatchValue(initValue);

    const watchElem = document.createElement("div");
    watchElem.innerHTML = `${label}: <span id="${id}">${escapedValue}</span>`;

    const overlay = document.querySelector("#debugOverlay");
    overlay.appendChild(watchElem);
}

/**
 * Updates the value to display in the debug overlay.
 * @param {string} id       The ID of the HTML element containing the value to display.
 * @param {any} value       The value to display.
 */
export function updateDebugWatch(id, value = "") {
    const watchValueElem = document.querySelector("#" + id);
    if (watchValueElem != null) {
        watchValueElem.textContent = escapeWatchValue(value);
    }
}