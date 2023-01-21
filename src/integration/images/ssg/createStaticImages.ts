import { mkdir, writeFile } from 'fs/promises';
import { dirname, join } from 'path';

import { transformImage } from '../sharp';
import type { ImageTransform } from '../types';
import { getImageFilename } from '../utils/getImageFilename';
import { readImage } from '../utils/readImage';

export async function createStaticImages(
    baseDir: string,
    outDir: string,
    src: string,
    transforms: ImageTransform[],
): Promise<void> {
    for (const t of transforms) {
        const image = await readImage(baseDir, src);

        const { width, format } = t;
        const data = await transformImage(image, {
            width,
            format,
            quality: 1,
            fit: 'cover',
            position: 'center',
        });

        const outFile = join(outDir, getImageFilename(src, t));
        await mkdir(dirname(outFile), { recursive: true });
        await writeFile(outFile, data);
    }
}
