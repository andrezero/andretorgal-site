import type { Root } from 'mdast';
import { visit } from 'unist-util-visit';

import { type BaseNode, getNodeImage } from '~/content';
import type { ImportedImage } from '~/integration/images/types';

type LinkNode = {
    tagName: 'a';
    properties?: {
        href?: string;
    };
};

type ImageNode = {
    tagName: 'img';
    properties?: {
        src?: string;
    };
};

function isAbsolute(src: string) {
    return src.startsWith('http') || src.startsWith('//');
}

export function rehypeTransformLinks(baseUrl: string, n: BaseNode) {
    return async function (tree: Root): Promise<void> {
        // Pre-resolve image sources before visiting nodes
        const imagesToResolve: Array<ImportedImage | string> = [];
        visit(tree, 'element', (node: LinkNode | ImageNode) => {
            if (node.tagName === 'img' && node.properties?.src) {
                const src = node.properties.src as string;
                if (!isAbsolute(src)) {
                    const resolved = getNodeImage(n, src);
                    imagesToResolve.push(resolved ? resolved() : src);
                }
            }
        });
        const resolvedImages = await Promise.all(imagesToResolve);

        const getImage = (index: number, src: string) => {
            // eslint-disable-next-line security/detect-object-injection
            const image = resolvedImages[index];
            const resolved = typeof image === 'string' ? image : image?.default.src;
            return resolved || src;
        };

        // Process the tree synchronously with resolved data
        visit(tree, 'element', (node: LinkNode | ImageNode, index) => {
            if (node.tagName === 'img' && node.properties?.src) {
                const src = node.properties.src as string;
                if (!isAbsolute(src)) {
                    node.properties.src = `${baseUrl}${getImage(index, src)}`;
                }
            }

            if (node.tagName === 'a' && node.properties?.href) {
                const href = node.properties.href as string;
                if (!isAbsolute(href)) {
                    node.properties.href = `${baseUrl}${href}`;
                }
            }
        });
    };
}
