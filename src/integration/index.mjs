import { resolve } from 'path';

import remarkA11yEmoji from '@fec/remark-a11y-emoji';
import remarkEmoji from 'remark-emoji';
import remarkUnwrapImages from 'remark-unwrap-images';

import { ssg } from './images/ssg/index.ts';
import { externalLinks } from './rehype/externalLinks.ts';
import { autoAbstract } from './remark/autoAbstract.ts';
import { autoHero } from './remark/autoHero.ts';
import { autoImports } from './remark/autoImports.ts';
import { customComponents } from './remark/customComponents.ts';
import { relativeImages } from './remark/relativeImages.ts';

const staticImages = new Map();

const PKG_NAME = '@andrezero/mySite';
const ROUTE_PATTERN = '/_image';

const baseDir = resolve('./src/pages');
const componentsFile = resolve('./src/customComponents.ts');
const autoImportFile = resolve('./src/autoImports.ts');
const cacheDir = resolve('./node_modules/.my-astro');

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
                    [autoHero, { baseDir }],
                    remarkUnwrapImages,
                    [relativeImages, { baseDir }],
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
                        entryPoint: resolve('src/integration/images/server/index.ts'),
                    });
                }

                globalThis.myIntegration = {
                    isStaticBuild,
                    addStaticImage: () => undefined,
                };
            },
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
    };
}
