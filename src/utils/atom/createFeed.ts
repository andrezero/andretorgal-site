import type { AtomFeed } from './types';

import { SITE_AUTHOR, SITE_FEED, SITE_TITLE, SITE_URL } from '~/config';

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
            cover: SITE_URL + SITE_FEED.cover,
            icon: SITE_URL + SITE_FEED.icon,
            logo: SITE_URL + SITE_FEED.logo,
            color: SITE_FEED.color,
        },
        author,
    };
}
