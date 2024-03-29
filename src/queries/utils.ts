import type { MarkdownInstance } from 'astro';

import type { BaseNode, GlobResult } from './types';

function filterDrafts(node: BaseNode): boolean {
    if (import.meta.env.MODE === 'development') {
        return true;
    }
    return !node.draft;
}

export function baseNodeFromMD<T extends BaseNode>(node: MarkdownInstance<T>): T {
    const fm = node.frontmatter;
    const url = node.url || '/';
    return { ...fm, url };
}

export async function globResultToArray<T extends BaseNode>(result: GlobResult<T>): Promise<T[]> {
    const raw = await Promise.all(Object.values(result).map(fn => fn()));
    return raw
        .filter(node => !!node.frontmatter.type)
        .map(node => baseNodeFromMD<T>(node))
        .filter(filterDrafts);
}
