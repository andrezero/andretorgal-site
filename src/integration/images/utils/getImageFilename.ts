import GithubSlugger from 'github-slugger';

import type { ImageTransform } from '../types';

import { IS_REMOTE_IMAGE } from './constants';

const slugger = new GithubSlugger();

export function getImageFilename(src: string, transform: ImageTransform): string {
    const { width, format } = transform;
    // eslint-disable-next-line security/detect-unsafe-regex
    const extensionLessName = src.replace(/\.[a-z]+$/, '');
    const name = IS_REMOTE_IMAGE.test(src)
        ? `/images/${slugger.slug(extensionLessName)}`
        : extensionLessName;
    return `${name}-${width}.${format}`;
}
