import { resolve } from 'path';

import remarkA11yEmoji from '@fec/remark-a11y-emoji';
import remarkEmoji from 'remark-emoji';
import remarkUnwrapImages from 'remark-unwrap-images';

import { LAYOUT_BY_TYPE, LAYOUT_DEFAULT } from './constants';
import {
    autoLayout,
    collectAndDecorateLinks,
    collectImages,
    collectMdxFilenames,
    exposeRawContent,
} from './rehype';
import { autoAbstract, autoImports, customComponents } from './remark';

const PKG_NAME = '@andrezero/mySite';

const componentsFile = resolve('./src/customComponents.ts');
const autoImportFile = resolve('./src/autoImports.ts');

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
                    [customComponents, { componentsFile }],
                    [autoImports, { autoImportFile }],
                    [exposeRawContent],
                ];
                const rehypePlugins = [
                    [autoLayout, LAYOUT_BY_TYPE, LAYOUT_DEFAULT],
                    collectMdxFilenames,
                    collectImages,
                    collectAndDecorateLinks,
                ];

                updateConfig({
                    markdown: { remarkPlugins, rehypePlugins },
                });
            },
        },
    };
}
