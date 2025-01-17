import { today } from '@utils/date';

import type { BaseNode, PageNode, TagNode } from './types';

export function createNode(type: string, title: string, url: string): BaseNode {
    return {
        filename: '',
        url,
        type,
        title,
        published: today(),
        links: [],
        images: { external: [], internal: [] },
        urls: { external: [], internal: [] },
        markdown: '',
    };
}

export function createTag(name: string): TagNode {
    const base = createNode('tag', name, `tags/${name}`);
    return { ...base, count: 0 };
}

export function createPage(name: string, url: string): PageNode {
    return createNode('page', name, url) as PageNode;
}

export function createLink(name: string, url: string): PageNode {
    return createNode('link', name, url) as PageNode;
}
