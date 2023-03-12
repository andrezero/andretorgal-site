import { SITE_AUTHOR, SITE_DESCRIPTION, SITE_OG_IMAGE, SITE_TITLE, SITE_URL } from '~/config';

export const absolute = (path: string): string => `${SITE_URL}${path}`;

const author = SITE_AUTHOR;
export const site = {
    url: SITE_URL,
    value: SITE_TITLE,
    image: absolute(SITE_OG_IMAGE),
    description: SITE_DESCRIPTION,
};
export type ATOM = {
    title: string;
    date: Date;
    description: string;
    link: string;
    tags: string[];
    image: string;
};

const atomItem = ({ title, link, date, tags, description, image }: ATOM): string => {
    return `<item>
            <title>${title}</title>
            <link>${link}</link>
            <guid>${link}</guid>
            <pubDate>${date.toUTCString()}</pubDate>
            ${tags && tags.map(t => `<category>${t}</category>`).join('')}
            <description>${description}</description>
            <author>${author}</author>
            ${image ? `<enclosure url="${image}" length="0" type="image/jpg"/>` : ''}
        </item>`;
};

const channel = (items: ATOM[]) => {
    return `<channel>
        <title>${site.value}</title>
        <link>${site.url}</link>
        <atom:link rel="self" href="${site.url}/rss.xml" type="application/rss+xml" />
        <language>en</language>
        <description>${site.description}</description>
        <image>
            <title>${site.value}</title>
            <url>${site.image}</url>
            <link>${site.url}</link>
        </image>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        ${items.map(atomItem).join('')}
    </channel>`;
};

export const atomXml = (items: ATOM[]): string => {
    return `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
    ${channel(items)}
</rss>
`;
};
