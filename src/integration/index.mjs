import { resolve } from 'path';

import remarkA11yEmoji from '@fec/remark-a11y-emoji';
import remarkEmoji from 'remark-emoji';
import remarkUnwrapImages from 'remark-unwrap-images';

import { autoAbstract } from '../plugins/autoAbstract.mjs';
import { autoImages } from '../plugins/autoImages.mjs';
import { autoImports } from '../plugins/autoImports.mjs';
import { customComponents } from '../plugins/customComponents.mjs';
import { externalLinks } from '../plugins/externalLinks.mjs';
import { ssg } from './ssg/index.mjs';

const staticImages = new Map();

const PKG_NAME = '@andrezero/mySite';
const ROUTE_PATTERN = '/_image';

const baseDir = resolve('./src/pages');
const componentsFile = resolve('./src/customComponents.ts');
const autoImportFile = resolve('./src/autoImports.ts');
const cacheDir = resolve('./node_modules/.integration');

let isStaticBuild;

export function myAstro() {
    return {
        name: PKG_NAME,
        hooks: {
            'astro:config:setup': async ({ command, config, updateConfig, injectRoute }) => {
                const remarkPlugins = [
                    remarkEmoji,
                    remarkA11yEmoji,
                    autoAbstract,
                    remarkUnwrapImages,
                    [autoImages, { baseDir }],
                    [customComponents, { componentsFile }],
                    [autoImports, { autoImportFile }],
                ];
                const rehypePlugins = [externalLinks];

                updateConfig({
                    markdown: { remarkPlugins, rehypePlugins },
                });

                isStaticBuild = command === 'build' && config.output === 'static';

                if (command === 'dev' || config.output === 'server') {
                    injectRoute({
                        pattern: ROUTE_PATTERN,
                        entryPoint: resolve('src/integration/server/index.mjs'),
                    });
                }

                globalThis.myIntegration = {
                    isStaticBuild,
                    addStaticImage: () => undefined,
                };
            },
            'astro:config:done': ({ config }) => {},
            'astro:build:start': ({ buildConfig }) => {},
            'astro:build:setup': async () => {
                const addStaticImage = (src, transform) => {
                    const transforms = staticImages.has(src) ? staticImages.get(src) : new Set();

                    transforms.add(transform);
                    staticImages.set(src, transforms);
                };

                globalThis.myIntegration.addStaticImage = isStaticBuild
                    ? addStaticImage
                    : () => undefined;
            },
            'astro:build:generated': async ({ dir }) => {
                await ssg('src/pages', dir.pathname, cacheDir, staticImages);
            },
        },
        'astro:build:ssr': async params => {},
    };
}
