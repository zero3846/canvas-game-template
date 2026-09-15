/**
 * The images that are currently loaded, organized by the ID given to
 * them with the loadImage() method.
 * @type {Map<string, Image>}
 */
const loadedImages = new Map();

/**
 * Checks whether an image is currently loaded.
 * @param {string} imageId  The ID of the image.
 * @returns {boolean} True if the image is loaded.
 */
export function isImageLoaded(imageId) {
    return loadedImages.has(imageId);
}

/**
 * Gets the Image instance for the given image.
 * @param {string} imageId The ID of the image.
 * @returns {Image|undefined} The loaded image object, or undefined
 * if the image is not loaded.
 */
export function getImage(imageId) {
    return loadedImages.get(imageId);
}

/**
 * Loads an image. The image object can be retrieved when the returned
 * Promise resolves or with the getImage() method, using the 'id' that
 * is given in this method.
 * @param {string} id   A unique identifier to identify an image asset.
 * If another image is loaded with the same ID, then it will override
 * the previously loaded image.
 * @param {string} src  The source file/url path for the image.
 * @returns {Promise<Image>} A promise that resolves to the loaded image.
 */
export async function loadImage(id, src) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => {
            loadedImages.set(id, image);
            resolve(image);
        };
        image.onerror = (err) => reject(err);
        image.src = src;
    });
}
