import type { MDXInstance } from 'astro';

import type { BaseNode, GlobResult } from '../types';

function filterDrafts(node: BaseNode): boolean {
    if (import.meta.env.MODE === 'development') {
        return true;
    }
    return !node.draft;
}

function markdownToNode<T extends BaseNode>(node: MDXInstance<T>): T {
    const fm = node.frontmatter;
    const url = node.url || '/';
    return { ...fm, url };
}

export async function globResultToArray<T extends BaseNode>(result: GlobResult<T>): Promise<T[]> {
    const raw = await Promise.all(Object.values(result).map(fn => fn()));
    return raw
        .filter(node => {
            if (!node.frontmatter) {
                console.error(node);
            }
            return Boolean(node.frontmatter?.type);
        })
        .map(node => markdownToNode<T>(node))
        .filter(filterDrafts);
}
