// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

import type { NodeImageMeta } from './content';

export const SITE_URL = 'https://andretorgal.com';
export const SITE_TITLE = 'André Torgal';
export const SITE_AUTHOR = 'hello@andretorgal.com (André Torgal)';
export const SITE_DESCRIPTION =
    'My name is Andre Torgal and I was born in 1973 in Lisbon, Portugal. This is my website, a place where I can blog some thoughts and run a few experiments. Learn more about me, my work, and other stuff I have been up to.';
export const SITE_OG_IMAGE: NodeImageMeta = {
    href: '/media/og-default.jpg',
    alt: 'A stylized black and white photo of your truly standing in front of a fake giant moon. Dreamer much?',
    type: 'image/jpeg',
    width: '2600',
    height: '1950',
};
