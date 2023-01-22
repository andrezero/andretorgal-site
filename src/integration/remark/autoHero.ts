import type { Root } from 'mdast';
import { visit } from 'unist-util-visit';

import type { ImageProps } from '../images/types';
import { getPublicPath } from '../images/utils/getPublicPath';
import type { RemarkPlugin } from '../types/RemarkPlugin';
import type { VFile } from '../types/VFile';

type Options = {
    baseDir: string;
};

export function autoHero(options: Options): RemarkPlugin {
    const { baseDir } = options;

    return function (tree: Root, file: VFile): void {
        visit(tree, { type: 'mdxJsxFlowElement', name: 'Hero' }, node => {
            const mdxFilename = file.history[0];

            if (!mdxFilename) {
                return;
            }

            visit(node, 'image', image => {
                const { url, alt, title } = image;
                const { frontmatter } = file.data.astro;
                const autoHero: ImageProps = {
                    src: getPublicPath(baseDir, mdxFilename, url),
                    alt,
                    title,
                };
                frontmatter.autoHero = autoHero;
            });
        });
    };
}
