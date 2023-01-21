import mdx from '@astrojs/mdx';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import markdownIntegration from '@astropub/md';
import remarkA11yEmoji from '@fec/remark-a11y-emoji';
import { defineConfig } from 'astro/config';
import { resolve } from 'path';
import remarkEmoji from 'remark-emoji';
import { myAstro } from './src/integration/index.mjs';

import { customComponents } from './src/plugins/customComponents.mjs';

const componentsFile = resolve('./src/customComponents.ts');

export default defineConfig({
    site: 'https://andretorgal.com',
    integrations: [myAstro(), markdownIntegration(), preact(), mdx(), sitemap()],

    markdown: {
        remarkPlugins: [remarkEmoji, remarkA11yEmoji, [customComponents, { componentsFile }]],
    },
    extendDefaultPlugins: true,
});
