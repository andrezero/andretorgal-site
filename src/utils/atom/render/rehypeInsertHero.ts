import type { Element, Root } from 'hast';

import { type BaseNode, getNodeHeroImage } from '~/nodes';

export function rehypeInsertHero(n: BaseNode) {
    return async function (tree: Root): Promise<void> {
        const hero = getNodeHeroImage(n);
        if (hero) {
            const img: Element = {
                type: 'element',
                tagName: 'img',
                properties: {
                    src: hero.src,
                    alt: hero.alt || '',
                },
                children: [],
            };
            tree.children.unshift(img);
        }
    };
}
