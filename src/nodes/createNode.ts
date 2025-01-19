import { capitalize } from '../integration/remark';
import { today } from '../utils/date';

import type { BaseNode, KindNode, LikeNode, PageNode, TagNode } from './types';

export function createNode(type: string, title: string, url: string): BaseNode {
    return {
        filename: '',
        url,
        type,
        title,
        published: today(),
        likes: [],
        images: { external: [], internal: [] },
        links: [],
        markdown: '',
    };
}

export function createTag(name: string): TagNode {
    const base = createNode('tag', name, `/tags/${name}`);
    return { ...base, count: 0 };
}

export function createKind(name: string): KindNode {
    const base = createNode('kind', name, `/likes/${name}`);
    const slug = base.url.replace('/likes/', '');
    const plural = capitalize(name) + 's';
    return { ...base, plural, slug, count: 0 };
}

export function createLike(url: string): LikeNode {
    const [kind, name] = url.split('/') as [string, string];
    const base = createNode('like', name, `/likes/${url}`);
    return { ...base, kind, data: {} };
}

export function createPage(name: string, url: string): PageNode {
    return createNode('page', name, url) as PageNode;
}

export function createLink(name: string, url: string): PageNode {
    return createNode('link', name, url) as PageNode;
}
