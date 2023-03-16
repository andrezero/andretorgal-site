import { getOgImage } from '@integration/images/utils/getOgImage';
import { importAllPosts } from '@queries/posts';
import type { BaseNode } from '@queries/types';
import escapeHTML from 'escape-html';
import sanitizeHtml from 'sanitize-html';

import { SITE_OG_IMAGE } from '~/config';
import type { ATOM } from '~/utils/atomXML';
import { absolute, atomXml } from '~/utils/atomXML';

const nodeToAtom = (node: BaseNode): ATOM => {
    const {
        title,
        published,
        abstract,
        images,
        imageBaseDir,
        mdxFilename,
        ogImage: maybeOgImage,
        tags,
    } = node;
    const date = new Date(published);

    const ogImage = getOgImage(imageBaseDir, mdxFilename, maybeOgImage, images, SITE_OG_IMAGE);

    return {
        title,
        link: absolute(node.url),
        date,
        description: sanitizeHtml(escapeHTML(abstract?.text || '')),
        image: sanitizeHtml(ogImage),
        tags: tags || [],
    };
};

export async function get(): Promise<{
    body: string;
}> {
    const allNodes = await importAllPosts();
    const items: ATOM[] = allNodes.map(nodeToAtom);
    const body = atomXml(items);

    return { body };
}
