import type { AtomFeed } from './types';

import { SITE_AUTHOR, SITE_URL } from '~/config';

export function createFeed(
    route: string,
    title: string,
    subtitle: string,
    author = SITE_AUTHOR,
): AtomFeed {
    const uri = `${SITE_URL}/${route}/atom.xml`;
    return {
        id: uri,
        title,
        subtitle,
        uri,
        site: {
            uri: SITE_URL,
        },
        author,
    };
}
