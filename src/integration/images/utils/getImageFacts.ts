import { DEFAULT_IMAGE_SIZE } from '../profiles';
import type { ImageFacts } from '../types';

import { readImage } from './readImage';

export async function getImageFacts(basePath: string, src: string): Promise<ImageFacts> {
    const image = await readImage(basePath, src);

    const { width = DEFAULT_IMAGE_SIZE, height = DEFAULT_IMAGE_SIZE } = await image.metadata();
    const { dominant } = await image.stats();
    const { r, g, b } = dominant;
    return { width, height, dominant: `rgb(${r}, ${g}, ${b})` };
}
