import { today } from '@utils/date';
import type { MarkdownInstance } from 'astro';

import type { BaseNode, TagNode } from './types';
import { globResultToArray } from './utils';

export const TOP_TAGS_COUNT = 10;

function newTag(name: string): TagNode {
    return {
        type: 'tag',
        url: `/tags/${name}`,
        title: name,
        published: today(),
        count: 0,
        images: [],
        links: { external: [], internal: [] },
        mdxFilename: '',
    };
}

type TagMap = {
    [key: string]: TagNode;
};

export async function importAllTags(): Promise<TagNode[]> {
    const allNodes: BaseNode[] = [];
    await globResultToArray<BaseNode>(
        import.meta.glob<MarkdownInstance<BaseNode>>('../pages/**/*.(md|mdx)'),
    );

    const tagNodes = allNodes.filter(node => node.type === 'tag');

    const tagAccumulator = tagNodes.reduce((acc, node) => {
        const tag = node.title || '!';
        // eslint-disable-next-line security/detect-object-injection
        acc[tag] = { ...node, count: 0 };
        return acc;
    }, {} as TagMap);

    const tags = allNodes
        .filter(item => item.tags?.length)
        .reduce((acc, item) => {
            item.tags?.forEach((tag: string) => {
                // eslint-disable-next-line security/detect-object-injection
                const node = acc[tag] || newTag(tag);
                node.count++;
                // eslint-disable-next-line security/detect-object-injection
                acc[tag] = node;
            });
            return acc;
        }, tagAccumulator);

    return Object.entries(tags)
        .sort((entryA, entryB) => entryB[1].count - entryA[1].count)
        .map(([, tag]) => tag);
}

export async function importTopTags(): Promise<TagNode[]> {
    const allTags = await importAllTags();
    const filteredTags = allTags.filter(tag => tag.title !== 'andretorgal-com');
    return filteredTags.slice(0, TOP_TAGS_COUNT);
}
