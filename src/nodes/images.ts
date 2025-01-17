import { dirname, resolve } from 'node:path';

import type { ImportedImageFn, ResolvedImage } from '@integration/images';
import type { ImageInputFormat, ImageMetadata } from 'astro';

import type { BaseNode, NodeImageMeta } from './types';

const FORMAT_TO_TYPE: Record<ImageInputFormat, string> = {
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg',
    png: 'image/png',
    tiff: 'image/tiff',
    webp: 'image/webp',
    gif: 'image/gif',
    svg: 'image/svg+xml',
    avif: 'image/avif',
};

export function fetchImages(): Record<string, () => Promise<{ default: ImageMetadata }>> {
    return import.meta.glob<{ default: ImageMetadata }>('/src/pages/**/*.{jpeg,jpg,png,gif}');
}

export function imageFormatToMimeType(format: ImageInputFormat): string {
    // eslint-disable-next-line security/detect-object-injection
    return FORMAT_TO_TYPE[format];
}

export function getNodeImage(node: BaseNode, src: string): ImportedImageFn | undefined {
    const root = resolve('.');
    const path = resolve(dirname(node.filename), src).replace(root, '');

    const images = fetchImages();
    const entry = Object.entries(images).find(([key]) => {
        return key === path;
    });
    return entry && entry[1];
}

export async function resolveNodeImage(
    node: BaseNode,
    src: string,
): Promise<ResolvedImage | undefined> {
    const imported = getNodeImage(node, src);
    if (imported) {
        const resolved = (await imported()).default;
        return {
            ...resolved,
            href: resolved.src,
        };
    }
    return undefined;
}

export function createImageMeta(resolvedImage: ResolvedImage, alt: string): NodeImageMeta {
    return {
        ...resolvedImage,
        alt,
        type: imageFormatToMimeType(resolvedImage.format),
        width: String(resolvedImage.width),
        height: String(resolvedImage.height),
    };
}
