# README

This is a template project for basic HTML canvas games using the 2D rendering context.

## Debug Mode

Debug mode can be enabled during runtime with the backtick <kbd>\`</kbd> key.

Register debug watch values with the `registerDebugWatch()` method at the very beginning of the `initGame()` method. This will allow you to display runtime values in the debug overlay. Use `updateDebugWatch()` to update the display with a new value.

## Scripts

| Command           | Description                                                                                                                                                                                                       |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run build`   | Builds the frontend.                                                                                                                                                                                              |
| `npm run dev`     | Runs a development server for the frontend with hot reloading enabled.                                                                                                                                            |
| `npm run preview` | Deploys the app frontend to localhost. There is no hot reloading. It expects that `npm run build` was previously run.                                                                                             |
| `npm run start`   | Starts the backend server. By default, it is also configured to deploy the app frontend. Like with `npm run preview`, there is no hot reloading, and it also expects `npm run build` to have been previously run. |

## Folder Structure

| Folder          | Description                |
| --------------- | -------------------------- |
| `dist`          | The frontend build folder. |
| `public`        | Static resources.          |
| `public/images` | Static images.             |
| `src`           | The root source directory. |
| `src/core`      | Shared modules.            |
| `src/game1`     | Modules for game1.         |
| `src/game2`     | Modules for game2.         |
| `src/game3`     | Modules for game3.         |
| `src/server`    | Shared server modules.     |

### Game Folder Structure

The folder structure is generally organized by features, with the primary feature being a single game. This allows related code to remain near each other.

Each game will generally have the following files:

| File         | Description                                                                           |
| ------------ | ------------------------------------------------------------------------------------- |
| `game.js`    | Contains the game logic. Must call `startGameLoop()` from `src/core/setup.js` on load. |
| `inputs.js`  | Sets up event handlers and maps all user input to game actions.                       |
| `index.html` | The entry point for the game.                                                         |
