import { ogImageProfile } from '../profiles';

import { getPublicPath } from './getPublicPath';
import { resolveImageProps } from './props';

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

    const props = resolveImageProps({ src, profile: ogImageProfile });

    return props.src;
}
