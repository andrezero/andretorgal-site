import { getPublicPath } from './getPublicPath';

export function getThumbImage(
    baseDir: string,
    mdxFilename: string,
    maybeOgImage: string | undefined,
    images: string[],
): string | undefined {
    const src = maybeOgImage
        ? getPublicPath(baseDir, mdxFilename, maybeOgImage)
        : images.length && (images[0] as string);

    return src || undefined;
}
