import type { AtomFeed, AtomItem } from './types';

const atomItem = (data: AtomItem): string => {
    const { id, title, link, updated, content } = data;
    return `
    <item>
        <id>${id}</id>
        <title>${title}</title>
        <link>${link}?source=rss</link>
        <updated>${updated.toISOString()}</updated>
        <content type="html">${content}</content>
    </item>`;
    // ${tags && tags.map(t => `<category>${t}</category>`).join('')}
};

const atomMeta = (feed: AtomFeed, items: AtomItem[]) => {
    const updated = items[0]?.updated || new Date();
    return `
    <id>${feed.uri}</id>
    <title>${feed.title}</title>
    <subtitle>${feed.subtitle}</subtitle>
    <link href="${feed.uri}" rel="self"/>
    <link href="${feed.site.uri}"/>
    <author>
        <name>${feed.author.name}</name>
        <email>${feed.author.email}</email>
        <uri>${feed.author.uri}</uri>
    </author>
    <updated>${new Date(updated).toUTCString()}</updated>
    `;
};

export const atomFeed = (feed: AtomFeed, items: AtomItem[]): string => {
    return `
<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
    ${atomMeta(feed, items)}
    ${items.map(item => atomItem(item)).join('')}
</feed>
    `.trim();
};
