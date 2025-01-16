import type { AtomFeed } from './types';

import { SITE_AUTHOR, SITE_TITLE, SITE_URL } from '~/config';

export function createFeed(
    route: string,
    title: string,
    subtitle: string,
    author = SITE_AUTHOR,
): AtomFeed {
    const uri = `${SITE_URL}${route}/atom.xml`;
    return {
        id: uri,
        title: `${SITE_TITLE}: ${title}`,
        subtitle,
        uri,
        site: {
            uri: SITE_URL,
        },
        author,
    };
}
