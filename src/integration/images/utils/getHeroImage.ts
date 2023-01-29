import { heroImageProfile } from '../profiles';
import type { ImageProps } from '../types';

import { getPublicPath } from './getPublicPath';

export function getHeroImage(
    baseDir: string,
    mdxFilename: string,
    maybeHeroImage: string | boolean | undefined,
    autoHero: ImageProps | undefined,
    images: string[],
): ImageProps | undefined {
    const profile = heroImageProfile;
    if (typeof maybeHeroImage === 'string') {
        const src = getPublicPath(baseDir, mdxFilename, maybeHeroImage);
        return { src, profile };
    }
    if (autoHero) {
        return { ...autoHero, profile };
    }
    if (typeof maybeHeroImage === 'boolean' && images.length) {
        return { src: images[0] as string, profile };
    }
    return undefined;
}
