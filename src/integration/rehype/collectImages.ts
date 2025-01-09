import type { Root } from 'mdast';
import { visit } from 'unist-util-visit';

import type { RemarkPlugin } from '../types/RemarkPlugin';
import type { VFile } from '../types/VFile';

type Image = {
    src: string;
    alt: string;
};

type Images = {
    internal: Image[];
    external: Image[];
};

type ImageNode = {
    tagName: string;
    properties?: {
        src?: string;
        alt?: string;
    };
};

export function collectImages(): RemarkPlugin {
    return function (tree: Root, file: VFile): void {
        const images: Images = { internal: [], external: [] };

        visit(tree, 'element', (node: ImageNode) => {
            if (
                node.tagName === 'img' &&
                node.properties &&
                typeof node.properties.src === 'string'
            ) {
                const src = node.properties.src;
                const alt = node.properties.alt || '';
                const isAbsolute = /^[a-z]+:/.test(src) || src.startsWith('//');
                if (isAbsolute) {
                    images.external.push({ src, alt });
                } else {
                    images.internal.push({ src, alt });
                }
            }
        });

        const { frontmatter } = file.data.astro;
        frontmatter.mdxFilename = file.history[0];
        frontmatter.images = images;
    };
}
