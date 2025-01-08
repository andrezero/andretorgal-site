import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { myAstro } from './src/integration/index.mjs';

export default defineConfig({
    site: 'https://andretorgal.com',
    integrations: [myAstro(), mdx(), sitemap()],
});
