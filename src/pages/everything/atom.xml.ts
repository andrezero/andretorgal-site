import { fetchAllNodes, sortNodes } from '@content/index';

import { createFeed } from '~/utils/atom/createFeed';
import { atomFeed } from '~/utils/atom/feed';
import { nodeToAtomItem } from '~/utils/atom/item';

export async function GET(): Promise<Response> {
    const allNodes = await fetchAllNodes();
    const filtered = allNodes.filter(n => {
        return Boolean(n.abstract?.text.trim() || n.markdown.trim());
    });

    const sorted = sortNodes(filtered);
    const nodes = sorted.slice(0, 100);

    const blogFeed = createFeed(
        '/everything',
        'Everything Feed',
        '(Experimental) Feed with *.* updates from this website: posts, media, tags, meta, ...',
    );
    const items = await Promise.all(nodes.map(node => nodeToAtomItem(blogFeed, node)));
    const body = atomFeed(blogFeed, items);

    return new Response(body);
}
