import type { AtomFeed, AtomItem } from './types';

function toIso8601(date: Date | string): string {
    return new Date(date).toISOString().split('.')[0] + 'Z';
}

const atomItemSummary = (data: AtomItem): string => {
    const { summary } = data;
    if (summary) {
        return `
        <summary type="html">${summary}</summary>`;
    }
    return '';
};

const atomItemContent = (data: AtomItem): string => {
    const { content } = data;
    if (content) {
        return `
        <content type="html">${content}</content>`;
    }
    return '';
};

const atomItemCategories = (data: AtomItem): string => {
    const { categories } = data;
    if (categories && categories.length > 0) {
        return categories.map(tag => `        <category term="${tag}" />`).join('\n');
    }
    return '';
};

const atomItem = (data: AtomItem): string => {
    const { id, title, link, updated } = data;
    const conditionals = [atomItemSummary(data), atomItemContent(data), atomItemCategories(data)];
    return `
    <entry>
        <id>${id}</id>
        <title>${title}</title>
        <link href="${link}?source=rss"/>
        <updated>${toIso8601(updated)}</updated>
        ${conditionals.filter(Boolean).join('\n')}
    </entry>`;
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
    <updated>${toIso8601(updated)}</updated>
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
