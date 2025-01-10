import { dirname, resolve } from 'node:path';

import type { ImageMetadata } from 'astro';

import type { BaseNode } from './types';

import type { ImportedImageFn } from '~/integration/images/types';

export function fetchImages(): Record<string, () => Promise<{ default: ImageMetadata }>> {
    return import.meta.glob<{ default: ImageMetadata }>('/src/pages/**/*.{jpeg,jpg,png,gif}');
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
