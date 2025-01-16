import { fetchAllNodes, sortNodes } from '@content/index';

import { createFeed } from '~/utils/atom/createFeed';
import { atomFeed } from '~/utils/atom/feed';
import { nodeToAtomItem } from '~/utils/atom/item';

export async function GET(): Promise<Response> {
    const allNodes = await fetchAllNodes();

    const sorted = sortNodes(allNodes);
    const blogFeed = createFeed(
        'everything',
        'Everything Feed',
        '(Experimental) Feed with *.* updates from this website: posts, media, tags, meta, ...',
    );
    const items = await Promise.all(sorted.map(node => nodeToAtomItem(blogFeed, node)));
    const body = atomFeed(blogFeed, items);

    return new Response(body);
}
