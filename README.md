# README

This is a template project for basic HTML canvas games using the 2D rendering context.

## Debug Mode
Debug mode can be enabled during runtime with the backtick <kbd>\`</kbd> key.

Register debug watch values with the `registerDebugWatch()` method at the very beginning of the `initGame()` method. This will allow you to display runtime values in the debug overlay. Use `updateDebugWatch()` to update the display with a new value.

## Scripts

`npm run build` builds the app's frontend.

`npm run dev` runs a development server for the frontend with hot reloading enabled.

`npm run preview` deploys the app frontend to localhost. There is no hot reloading. It expects that `npm run build` was previously run.

`npm run start` starts the backend server. By default, it is also configured to deploy the app frontend. Like with `npm run preview`, there is no hot reloading, and it also expects `npm run build` to have been previously run.

## Folder Structure

- app/
    - index.html
    - main.js
    - game.js
    - inputs.js
- dist/
- public/
    - images/
- server/
    - server.js

The `app` folder contains the frontend code.

The app's entry point is `app/index.html`, where it imports `main.js`.

Make sure to update `index.html` with the game's actual title.

`main.js` sets up the game's rendering loop. This file should not need to be modified for the simplest of games other than to adjust some logging or performance settings.

`game.js` defines the game's main logic, both in managing the game state and the rendering logic. It should not be concerned with the particulars of player input, which is the concern of `inputs.js`.

`inputs.js` is where all the event handlers are registered and defined. This file maps device inputs into player actions.

The `dist` folder contains the production build of the app's frontend.

The `public` folder is where all static assets go, like image files, which go under the `public/images` subfolder.

The `server` folder contains the backend code. Unless a game has a need to persist data or needs to process something on the server rather than in the browser, nothing needs to be changed here.