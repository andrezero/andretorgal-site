import image from '@astrojs/image';
import mdx from '@astrojs/mdx';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import remarkA11yEmoji from '@fec/remark-a11y-emoji';
import m2dx from 'astro-m2dx';
import { defineConfig } from 'astro/config';
import remarkEmoji from 'remark-emoji';

import { autoImages } from './src/plugins/autoImages.mjs';
import { externalLinks } from './src/plugins/externalLinks.mjs';

/** @type {import('astro-m2dx').Options} */
const m2dxOptions = {
    autoImports: true,
    autoImportsFailUnresolved: true,
    unwrapImages: true,
    relativeImages: true,
    exportComponents: true,
};

export default defineConfig({
    site: 'https://andretorgal.com',
    integrations: [
        preact(),
        mdx(),
        sitemap(),
        image({
            serviceEntryPoint: '@astrojs/image/sharp',
        }),
    ],
    markdown: {
        remarkPlugins: [remarkEmoji, remarkA11yEmoji, autoImages, [m2dx, m2dxOptions]],
        rehypePlugins: [externalLinks],
    },
    extendDefaultPlugins: true,
});
