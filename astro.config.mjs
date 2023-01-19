import mdx from '@astrojs/mdx';
import preact from '@astrojs/preact';
import m2dx from 'astro-m2dx';
import { defineConfig } from 'astro/config';

/** @type {import('astro-m2dx').Options} */
const m2dxOptions = {
    autoImports: true,
    autoImportsFailUnresolved: true,
};

export default defineConfig({
    site: 'https://andretorgal.com',
    integrations: [preact(), mdx()],
    markdown: {
        remarkPlugins: [[m2dx, m2dxOptions]],
    },
    extendDefaultPlugins: true,
});
