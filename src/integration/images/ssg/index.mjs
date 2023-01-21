import { doWork } from '@altano/tiny-async-pool';
import { bgGreen, black } from 'kleur/colors';
import OS from 'node:os';

import { createStaticImages } from './createStaticImages.mjs';

export async function ssg(baseDir, outDir, cacheDir, staticImages) {
    const cpuCount = OS.cpus().length;

    const message = `Optimizing ${staticImages.size} images ${staticImages.size} across ${cpuCount} CPUs`;
    console.info(`${bgGreen(black(message))}`);

    async function processStaticImage([src, transforms]) {
        await createStaticImages(baseDir, outDir, src, [...transforms.values()]);
    }

    await doWork(cpuCount, staticImages, processStaticImage);
}
