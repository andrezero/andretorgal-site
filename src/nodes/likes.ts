import type { MDXInstance } from 'astro';

import { createKind, createLike } from './createNode';
import { fetchAllNodes, sortNodes } from './nodes';
import { globResultToArray } from './private';
import type { BaseNode, KindNode, LikeNode } from './types';

type LikeMap = {
    [key: string]: LikeNode;
};

type KindMap = {
    [key: string]: KindNode;
};

export const LIKES_COUNT = 10;

export async function fetchNodesByLike(like: LikeNode): Promise<BaseNode[]> {
    const allNodes = await fetchAllNodes();
    const short = like.url.split('/').splice(2).join('/') as string;
    const nodes = sortNodes(allNodes.filter(n => n.likes?.includes(short)));
    return nodes;
}

export async function fetchAllLikes(): Promise<LikeNode[]> {
    const allNodes = await globResultToArray<BaseNode>(
        import.meta.glob<MDXInstance<BaseNode>>('/src/pages/**/*.(md|mdx)'),
    );

    const likeNodes = allNodes.filter(node => node.type === 'like') as LikeNode[];
    const likeAccumulator = likeNodes.reduce((acc, node) => {
        const like = node.url.replace('/likes/', '');
        acc[like] = node;
        return acc;
    }, {} as LikeMap);

    const likes = allNodes
        .filter(item => item.likes?.length)
        .reduce((acc, item) => {
            item.likes?.forEach((like: string) => {
                const node = acc[like] || createLike(like);
                acc[like] = node;
            });
            return acc;
        }, likeAccumulator);

    return Object.values(likes);
}

export async function fetchAllKinds(): Promise<KindNode[]> {
    const kindNodes = await globResultToArray<KindNode>(
        import.meta.glob<MDXInstance<KindNode>>('/src/pages/likes/*.(md|mdx)'),
    );

    const kindAccumulator = kindNodes.reduce((acc, node) => {
        const slug = node.url.replace('/likes/', '');
        acc[slug] = { ...node, slug, count: 0 };
        return acc;
    }, {} as KindMap);

    const likes = await fetchAllLikes();
    const kinds = likes.reduce((acc, item) => {
        const node = acc[item.kind] || createKind(item.kind);
        node.count++;
        acc[item.kind] = node;
        return acc;
    }, kindAccumulator);

    return Object.values(kinds);
}

export function filterLikesByKind(likes: LikeNode[], kind: KindNode): LikeNode[] {
    const slug = kind.url.replace('/likes/', '');
    return likes.filter(like => like.kind === slug);
}

export async function fetchLikesByKind(kind: KindNode): Promise<LikeNode[]> {
    const likes = await fetchAllLikes();
    return filterLikesByKind(likes, kind);
}
