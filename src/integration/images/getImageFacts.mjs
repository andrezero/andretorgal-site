/* eslint-disable security/detect-unsafe-regex */
import { readImage } from './readImage.mjs';

export const getImageFacts = async (basePath, src) => {
    const image = await readImage(basePath, src);

    const { width, height } = await image.metadata();
    const { dominant } = await image.stats();
    const { r, g, b } = dominant;
    return { width, height, dominant: `rgb(${r}, ${g}, ${b})` };
};
