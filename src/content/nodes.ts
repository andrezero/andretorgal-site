import type { MarkdownInstance } from 'astro';

import type { BaseNode, Image } from './types';
import { globResultToArray } from './utils';

export async function fetchAllNodes(): Promise<BaseNode[]> {
    return globResultToArray<BaseNode>(
        import.meta.glob<MarkdownInstance<BaseNode>>('/src/pages/**/*.(md|mdx)'),
    );
}

export function sortNodes(nodes: BaseNode[]): BaseNode[] {
    return nodes.sort((a, b) => new Date(b.published).valueOf() - new Date(a.published).valueOf());
}

export function getNodeHeroImage(node: BaseNode): Image | undefined {
    const { hero } = node;
    if (typeof hero === 'string') {
        return { src: hero, alt: '' };
    } else if (typeof hero === 'object') {
        return hero;
    }
    return undefined;
}

export function getNodeThumbImage(node: BaseNode): Image | undefined {
    const { thumb } = node;
    if (typeof thumb === 'string') {
        return { src: thumb, alt: '' };
    } else if (typeof thumb === 'object') {
        return thumb;
    }
    return getNodeHeroImage(node) || node.images.internal[0];
}
