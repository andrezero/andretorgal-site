import { today } from '@utils/date';

import type { BaseNode, PageNode, TagNode } from './types';

export function createNode(type: string, title: string, url: string): BaseNode {
    return {
        filename: '',
        url,
        type,
        title,
        published: today(),
        count: 0,
        images: { external: [], internal: [] },
        links: { external: [], internal: [] },
        markdown: '',
    };
}

export function createTag(name: string): TagNode {
    return createNode('tag', name, `tags/${name}`) as TagNode;
}

export function createPage(name: string, url: string): PageNode {
    return createNode('page', name, url) as PageNode;
}
