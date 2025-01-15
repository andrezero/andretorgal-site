import escapeHTML from 'escape-html';
import sanitizeHtml from 'sanitize-html';

import type { AtomFeed, AtomItem } from './types';

import type { BaseNode } from '~/content';

export const absolute = (base: string, path: string): string => `${base}${path}`;

export const nodeToAtomItem = (feed: AtomFeed, node: BaseNode): AtomItem => {
    const { published, abstract, tags } = node;
    const date = new Date(published);

    const link = absolute(feed.site.uri, node.url);

    return {
        id: node.url + '@' + date.toISOString().substring(0, 10),
        link,
        title: node.title,
        updated: date,
        content: sanitizeHtml(escapeHTML(abstract?.text || '')),
        categories: tags || [],
    };
};
