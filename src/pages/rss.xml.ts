import { importAllPosts } from '@queries/posts';
import type { BaseNode } from '@queries/types';
import { filterDrafts } from '@queries/utils';
import escapeHTML from 'escape-html';
import sanitizeHtml from 'sanitize-html';

import type { ATOM } from '../utils/atomXML';
import { absolute, atomXml, site } from '../utils/atomXML';

const nodeToAtom = (node: BaseNode): ATOM => {
    const { title, published, abstract, images, tags } = node;
    const date = new Date(published);

    return {
        title,
        link: absolute(node.url),
        date,
        description: sanitizeHtml(escapeHTML(abstract?.text || '')),
        image: images[0] ? absolute(images[0]) : site.image,
        tags: tags || [],
    };
};

export async function get(): Promise<{
    body: string;
}> {
    const allNodes = await importAllPosts();
    const items: ATOM[] = allNodes.filter(filterDrafts).map(nodeToAtom);
    const body = atomXml(items);

    return { body };
}