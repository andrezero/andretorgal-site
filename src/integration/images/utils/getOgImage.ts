import { ogImageProfile } from '../profiles';
import type { ImageProfile } from '../types';

import { getPublicPath } from './getPublicPath';
import { resolveImageProps } from './props';

export function resolveImageSrc(src: string, profile: ImageProfile): string {
    const props = resolveImageProps({ src, profile });
    return props.src;
}

export function getOgImage(
    baseDir: string,
    mdxFilename: string,
    maybeOgImage: string | undefined,
    images: string[],
    fallback: string,
): string {
    const src = maybeOgImage
        ? getPublicPath(baseDir, mdxFilename, maybeOgImage)
        : images.length
        ? (images[0] as string)
        : fallback;

    return resolveImageSrc(src, ogImageProfile);
}
