import type { NodeImageMeta } from './content';

export const SITE_URL = 'https://andretorgal.com';
export const SITE_TITLE = 'André Torgal';
export const SITE_DESCRIPTION =
    'My name is André Torgal and I was born in 1973 in Lisbon, Portugal. This is my website, a place where I can blog some thoughts and run a few experiments. Learn more about me, my work, and other stuff I have been up to.';

export const SITE_OG_IMAGE: NodeImageMeta = {
    href: '/media/og-default.jpg',
    alt: 'A stylized black and white photo of your truly standing in front of a fake giant moon. Dreamer much?',
    type: 'image/jpeg',
    width: '2600',
    height: '1950',
};

export const SITE_AUTHOR = {
    name: SITE_TITLE,
    email: 'hello@andretorgal.com',
    uri: SITE_URL,
};
export const SITE_FEED = {
    cover: '/media/og-default.jpg',
    icon: '/assets/logos/logo-192.png',
    logo: '/assets/logos/logo.svg',
    color: '#a81715',
};
