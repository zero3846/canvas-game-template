import { getImage } from "../core/images";
import { RenderLayer } from "./layers";
import { assetsReady, renderLoadScreen } from "./load-screen";

export function updateScene(currentTime) {
    
}

export function renderScene(context, layer) {
    if (layer === RenderLayer.FIRST) {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }

    if (!assetsReady()) {
        renderLoadScreen(context, layer);
        return;
    }

    if (layer === RenderLayer.SPRITES) {
        const imageSize = 48;
        let x = 128;
        let y = 128;

        let image = getImage("mouse");
        context.drawImage(image, x, y, imageSize, imageSize);
        x += imageSize;

        image = getImage("cheese");
        context.drawImage(image, x, y, imageSize, imageSize);
        x += imageSize;
    }
}