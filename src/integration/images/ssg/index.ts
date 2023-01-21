import OS from 'node:os';

import { doWork } from '@altano/tiny-async-pool';
import { bgGreen, black } from 'kleur/colors';

import type { ImageTransform } from '../types';

import { createStaticImages } from './createStaticImages';

export async function ssg(
    baseDir: string,
    outDir: string,
    cacheDir: string,
    staticImages: Map<string, Set<ImageTransform>>,
): Promise<void> {
    const cpuCount = OS.cpus().length;

    // TODO use cache
    console.info(`NOT using cache "${cacheDir}"`);

    const message = `Optimizing ${staticImages.size} images ${staticImages.size} across ${cpuCount} CPUs`;
    console.info(`${bgGreen(black(message))}`);

    async function processStaticImage([src, transforms]: [string, Set<ImageTransform>]) {
        await createStaticImages(baseDir, outDir, src, [...transforms.values()]);
    }

    await doWork(cpuCount, staticImages, processStaticImage);
}
