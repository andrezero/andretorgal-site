import image from '@astrojs/image';
import mdx from '@astrojs/mdx';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import markdownIntegration from '@astropub/md';
import remarkA11yEmoji from '@fec/remark-a11y-emoji';
import { defineConfig } from 'astro/config';
import path from 'path';
import remarkEmoji from 'remark-emoji';

import { autoAbstract } from './src/plugins/autoAbstract.mjs';
import { autoImages } from './src/plugins/autoImages.mjs';
import { autoImports } from './src/plugins/autoImports.mjs';
import { customComponents } from './src/plugins/customComponents.mjs';
import { externalLinks } from './src/plugins/externalLinks.mjs';
import { relativeImages } from './src/plugins/relativeImages.mjs';

const autoImportsConfig = {
    optAutoImportsFailUnresolved: true,
    autoImportFile: path.resolve('./src/autoImports.ts'),
};

const customComponentsConfig = {
    componentsFile: path.resolve('./src/customComponents.ts'),
};

const relativeImagesConfig = {
    componentsFile: path.resolve('./src/customComponents.ts'),
};

export default defineConfig({
    site: 'https://andretorgal.com',
    integrations: [
        markdownIntegration(),
        preact(),
        mdx(),
        sitemap(),
        image({
            serviceEntryPoint: '@astrojs/image/sharp',
        }),
    ],
    markdown: {
        remarkPlugins: [
            remarkEmoji,
            remarkA11yEmoji,
            autoImages,
            autoAbstract,
            [relativeImages, relativeImagesConfig],
            [autoImports, autoImportsConfig],
            [customComponents, customComponentsConfig],
        ],
        rehypePlugins: [externalLinks],
    },
    extendDefaultPlugins: true,
});
