import { fetchAllPosts, sortNodes } from '@content/index';

import { createFeed } from '~/utils/atom/createFeed';
import { atomFeed } from '~/utils/atom/feed';
import { nodeToAtomItem } from '~/utils/atom/item';

export async function GET(): Promise<Response> {
    const allPosts = await fetchAllPosts();

    const sorted = sortNodes(allPosts);
    const blogFeed = createFeed('posts', 'Blog Feed', 'Feed with updates from my blog.');
    const items = sorted.map(node => nodeToAtomItem(blogFeed, node));
    const body = atomFeed(blogFeed, items);

    return new Response(body);
}
