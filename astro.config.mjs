import { defineConfig } from 'astro/config';
import image from '@astrojs/image';
import mdx from '@astrojs/mdx';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
    site: 'https://andretorgal.com',
    integrations: [preact(), mdx(), sitemap(), image()],
});
