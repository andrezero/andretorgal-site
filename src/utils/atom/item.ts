import escapeHTML from 'escape-html';
import sanitizeHtml from 'sanitize-html';

import { render } from './render/render';
import type { AtomFeed, AtomItem } from './types';

import type { BaseNode } from '~/content';

export const absolute = (base: string, path: string): string => `${base}${path}`;

export async function nodeToAtomItem(feed: AtomFeed, node: BaseNode): Promise<AtomItem> {
    const { published, abstract, tags } = node;
    const date = new Date(published);

    const link = absolute(feed.site.uri, node.url);

    const html = await render(node);

    return {
        id: link + '@' + date.toISOString().substring(0, 10),
        link,
        title: node.title,
        updated: date,
        summary: sanitizeHtml(escapeHTML(abstract?.text || '')),
        content: sanitizeHtml(escapeHTML(html || '')),
        categories: tags || [],
    };
}
