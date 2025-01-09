import { resolve } from 'path';

import remarkA11yEmoji from '@fec/remark-a11y-emoji';
import remarkEmoji from 'remark-emoji';
import remarkUnwrapImages from 'remark-unwrap-images';

import { collectAndDecorateLinks } from './rehype/collectAndDecorateLinks.ts';
import { collectImages } from './rehype/collectImages.ts';
import { collectMdxFilenames } from './rehype/collectMdxFilenames.ts';
import { autoAbstract } from './remark/autoAbstract.ts';
import { autoImports } from './remark/autoImports.ts';
import { customComponents } from './remark/customComponents.ts';

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
                ];
                const rehypePlugins = [collectMdxFilenames, collectImages, collectAndDecorateLinks];

                updateConfig({
                    markdown: { remarkPlugins, rehypePlugins },
                });
            },
        },
    };
}
