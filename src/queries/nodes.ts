import type { MarkdownInstance } from 'astro';

import type { BaseNode } from './types';
import { globResultToArray } from './utils';

export function sortedNodes(nodes: BaseNode[]): BaseNode[] {
    return nodes.sort((a, b) => new Date(b.published).valueOf() - new Date(a.published).valueOf());
}

export async function importAllNodes(): Promise<BaseNode[]> {
    return globResultToArray<BaseNode>(
        import.meta.glob<MarkdownInstance<BaseNode>>('../pages/**/*.(md|mdx)'),
    );
}
