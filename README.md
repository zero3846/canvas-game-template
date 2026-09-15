# README

This is a template project for basic HTML canvas games using the 2D rendering context.

## Debug Mode
Debug mode can be enabled during runtime with the backtick <kbd>\`</kbd> key.

Register debug watch values with the `registerDebugWatch()` method at the very beginning
of the `initGame()` method. This will allow you to display runtime values in the debug
overlay. Use `updateDebugWatch()` to update the display with a new value.

## File Overview

### `index.html`
The main HTML file containing the canvas for the game. Please update the page title
and header with the game's actual name.

### `style.css`
The stylesheet used by `index.html` to layout the canvas.

### `main.js`
This defines the entry point for the game, namely the game's rendering loop. This file
should not need to be modified for the simplest of games other than to adjust some
logging or performance settings.

If there is any other setup required for the game, perhaps having to do with page loads,
it should go in this file.

### `game.js`
This file is where the game's main logic goes, both in managing the game state and the
rendering logic.

### `inputs.js`
This is where all the event handlers are registered and defined.

### `assets`
This folder contains all the games assets, like images, models, etc.