import { dirname, join } from 'path';
import { transform } from '../images/sharp.mjs';

import { mkdir, writeFile } from 'fs/promises';
import { imageFilename } from '../images/imageFilename.mjs';
import { readImage } from '../images/readImage.mjs';

export async function createStaticImages(baseDir, outDir, src, transforms) {
    for (const t of transforms) {
        const image = await readImage(baseDir, src);

        const { width, format } = t;
        const data = await transform(image, {
            width,
            format,
            quality: 1,
            fit: 'cover',
            position: 'center',
        });

        const outFile = join(outDir, imageFilename(src, t));
        await mkdir(dirname(outFile), { recursive: true });
        await writeFile(outFile, data);
    }
}
