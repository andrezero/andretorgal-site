import type { MDXInstance } from 'astro';

import { createTag } from './createNode';
import { globResultToArray } from './private';
import type { BaseNode, TagNode } from './types';

type TagMap = {
    [key: string]: TagNode;
};

export const TOP_TAGS_COUNT = 10;

export async function fetchAllTags(): Promise<TagNode[]> {
    const allNodes = await globResultToArray<BaseNode>(
        import.meta.glob<MDXInstance<BaseNode>>('/src/pages/**/*.(md|mdx)'),
    );

    const tagNodes = allNodes.filter(node => node.type === 'tag');
    const tagAccumulator = tagNodes.reduce((acc, node) => {
        const tag = node.title || '!';
        acc[tag] = { ...node, count: 0 };
        return acc;
    }, {} as TagMap);

    const tags = allNodes
        .filter(item => item.tags?.length)
        .reduce((acc, item) => {
            item.tags?.forEach((tag: string) => {
                const node = acc[tag] || createTag(tag);
                node.count++;
                acc[tag] = node;
            });
            return acc;
        }, tagAccumulator);

    return Object.entries(tags)
        .sort((entryA, entryB) => entryB[1].count - entryA[1].count)
        .map(([, tag]) => tag);
}

export async function fetchTopTags(): Promise<TagNode[]> {
    const allTags = await fetchAllTags();
    const filteredTags = allTags.filter(tag => tag.title !== 'andretorgal-com');
    return filteredTags.slice(0, TOP_TAGS_COUNT);
}
