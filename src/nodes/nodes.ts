import type { MDXInstance } from 'astro';

import { SITE_DESCRIPTION, SITE_OG_IMAGE, SITE_TITLE } from '../config';

import { createImageMeta, resolveNodeImage } from './images';
import { globResultToArray } from './private';
import type { BaseNode, Image, NodeMeta } from './types';

const ARTICLE_TYPES = ['post', 'tag', 'link'];

export async function fetchAllNodes(): Promise<BaseNode[]> {
    return globResultToArray<BaseNode>(
        import.meta.glob<MDXInstance<BaseNode>>('/src/pages/**/*.(md|mdx)'),
    );
}

export function sortNodes(nodes: BaseNode[]): BaseNode[] {
    return nodes.sort((a, b) => new Date(b.published).valueOf() - new Date(a.published).valueOf());
}

export function getNodeHeroImage(node: BaseNode): Image | undefined {
    const { hero } = node;
    if (typeof hero === 'string') {
        return { src: hero, alt: '' };
    } else if (typeof hero === 'object') {
        if (!hero.src) {
            throw new Error(`Missing src attribute in "hero" attribute at node: "{node.url}".`);
        }
        return hero;
    } else if (typeof hero === 'boolean' && hero) {
        return node.images.internal[0];
    }
    return undefined;
}

export function getNodeThumbImage(node: BaseNode): Image | undefined {
    const { thumb } = node;
    if (typeof thumb === 'string') {
        return { src: thumb, alt: '' };
    } else if (typeof thumb === 'object') {
        if (!thumb.src) {
            throw new Error(`Missing src attribute in "thumb" attribute at node: "{node.url}".`);
        }
        return thumb;
    }
    return getNodeHeroImage(node) || node.images.internal[0];
}

export function getNodeOgImage(node: BaseNode): Image | undefined {
    const { og } = node;
    if (typeof og === 'object') {
        const { image } = og;
        if (typeof image === 'string') {
            return { src: image, alt: '' };
        } else if (typeof image === 'object') {
            if (!image.src) {
                throw new Error(`Missing src attribute in "og" attribute at node: "{node.url}".`);
            }
            return image;
        }
    }
    return getNodeThumbImage(node) || node.images.internal[0];
}

export function getNodeType(node: BaseNode): string {
    if (ARTICLE_TYPES.includes(node.type)) {
        return 'article';
    }
    return 'website';
}

export async function getNodeMeta(node: BaseNode): Promise<NodeMeta> {
    const { title: maybeTitle, description: maybeDescription, abstract } = node;
    const { description: ogDescription } = node.og || {};
    const title = `${maybeTitle || 'Home'} | ${SITE_TITLE}`;
    const maybeAbstract = abstract?.text || node.description;
    const description = ogDescription || maybeDescription || maybeAbstract || SITE_DESCRIPTION;

    const ogImage = getNodeOgImage(node);
    const resolvedImage = ogImage && (await resolveNodeImage(node, ogImage.src));
    const image = resolvedImage ? createImageMeta(resolvedImage, ogImage.alt) : SITE_OG_IMAGE;
    const type = getNodeType(node);

    const feed = node.type === 'tag' ? node.url + '/atom.xml' : undefined;

    return {
        type,
        title,
        image,
        description,
        feed,
    };
}
