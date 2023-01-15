import image from '@astrojs/image';
import mdx from '@astrojs/mdx';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import remarkA11yEmoji from '@fec/remark-a11y-emoji';
import { defineConfig } from 'astro/config';
import remarkEmoji from 'remark-emoji';

import { autoImages } from './src/plugins/autoImages.mjs';
import { externalLinks } from './src/plugins/externalLinks.mjs';

// const p = () => (_ast, vfile) => {
//     console.log(_ast, vfile);
// };
// mdx({
//     recmaPlugins: [p],
// }),

export default defineConfig({
    site: 'https://andretorgal.com',
    markdown: {
        remarkPlugins: [remarkEmoji, remarkA11yEmoji, autoImages],
        rehypePlugins: [externalLinks],
    },
    integrations: [
        preact(),
        mdx(),
        sitemap(),
        image({
            serviceEntryPoint: '@astrojs/image/sharp',
        }),
    ],
});
