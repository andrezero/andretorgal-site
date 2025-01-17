import type { ImportedImage } from '@integration/images/types';
import { type BaseNode, getNodeImage } from '@nodes/index';
import type { Root } from 'mdast';
import { visit } from 'unist-util-visit';

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
        const imagesToResolve: Array<Promise<{ src: string; image: ImportedImage | string }>> = [];
        visit(tree, 'element', (node: LinkNode | ImageNode) => {
            if (node.tagName === 'img' && node.properties?.src) {
                const src = node.properties.src as string;
                if (!isAbsolute(src)) {
                    const resolved = getNodeImage(n, src);
                    imagesToResolve.push(
                        (async () => {
                            const r = resolved?.();
                            const image = (await r)?.default.src;
                            return { src, image: image || src };
                        })(),
                    );
                }
            }
        });
        const resolvedImages = await Promise.all(imagesToResolve);
        const imageMap = new Map(resolvedImages.map(item => [item.src, item.image]));

        const getImage = (src: string) => {
            // eslint-disable-next-line security/detect-object-injection
            const image = imageMap.get(src);
            if (!image) {
                console.error(`🟥🟥 no image for "${src}" 🟥🟥 `);
            }
            return image || src;
        };

        visit(tree, 'element', (node: LinkNode | ImageNode) => {
            if (node.tagName === 'img' && node.properties?.src) {
                const src = node.properties.src as string;
                if (!isAbsolute(src)) {
                    node.properties.src = `${baseUrl}${getImage(src)}`;
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
