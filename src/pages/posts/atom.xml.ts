import { fetchAllPosts, sortNodes } from '@nodes/index';
import { atomFeed, createFeed, nodeToAtomItem } from '@utils/atom';

export async function GET(): Promise<Response> {
    const allPosts = await fetchAllPosts();

    const sorted = sortNodes(allPosts);

    const blogFeed = createFeed('/posts', 'Blog Feed', 'Feed with updates from my blog');
    const items = await Promise.all(sorted.map(node => nodeToAtomItem(blogFeed, node)));
    const body = atomFeed(blogFeed, items);

    return new Response(body);
}
