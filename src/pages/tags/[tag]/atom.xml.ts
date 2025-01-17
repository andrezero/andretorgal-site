/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { type BaseNode, type TagNode, fetchAllNodes, fetchAllTags, sortNodes } from '@nodes/index';
import { atomFeed, createFeed, nodeToAtomItem } from '@utils/atom';
import type { APIContext } from 'astro';

export interface Props {
    tag: TagNode;
}

function expandToSubTags(allPosts: BaseNode[], tag: string) {
    const subTags = allPosts
        .filter(node => node.type === 'tag' && node.tags?.includes(tag))
        .map(node => node.title);

    return [tag, ...subTags];
}

function filterByTags(allPosts: BaseNode[], subTags: string[]) {
    return allPosts.filter(node => {
        return node.type !== 'tag' && subTags.find(tag => node.tags?.includes(tag));
    });
}

export async function getStaticPaths() {
    const tags = await fetchAllTags();

    return tags.map(tag => ({
        params: { tag: tag.title },
        props: { tag },
    }));
}

export async function GET(params: APIContext): Promise<Response> {
    const tag = params.props.tag.title;

    const allPosts = await fetchAllNodes();
    const subTags = expandToSubTags(allPosts, tag);
    const filtered = filterByTags(allPosts, subTags);
    const sorted = sortNodes(filtered);

    const blogFeed = createFeed(`/tags/${tag}`, `#${tag} Feed`, `All updates tagged with #${tag}`);
    const items = await Promise.all(sorted.map(node => nodeToAtomItem(blogFeed, node)));
    const body = atomFeed(blogFeed, items);

    return new Response(body);
}
