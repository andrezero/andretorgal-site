import { readFile } from 'fs/promises';
import { join } from 'path';

import sharp, { Sharp } from 'sharp';

import { IS_REMOTE_IMAGE } from './constants';

async function readRemoteImage(src: string): Promise<Buffer> {
    const response = await fetch(src);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    return Buffer.from(arrayBuffer);
}

async function readLocalImage(basePath: string, src: string): Promise<Buffer> {
    const filename = join(basePath, src);
    return readFile(filename);
}

export async function readImage(basePath: string, src: string): Promise<Sharp> {
    const buffer = IS_REMOTE_IMAGE.test(src) ? readRemoteImage(src) : readLocalImage(basePath, src);
    return sharp(await buffer);
}
