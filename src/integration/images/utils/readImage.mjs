/* eslint-disable security/detect-unsafe-regex */
import { readFile } from 'fs/promises';
import { join } from 'path';
import sharp from 'sharp';

const readRemoteImage = async src => {
    const response = await fetch(src);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    return Buffer.from(arrayBuffer);
};

const readLocalImage = async (basePath, src) => {
    const filename = join(basePath, src);
    return readFile(filename);
};

export const readImage = async (basePath, src) => {
    const isRemoteImage = /^(https?:)?\/\//.test(src);
    const buffer = isRemoteImage ? readRemoteImage(src) : readLocalImage(basePath, src);
    return sharp(await buffer);
};
