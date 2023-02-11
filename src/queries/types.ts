import type { ImageProps } from '@integration/images/types';
import type { MarkdownInstance, MarkdownLayoutProps } from 'astro';

export type GlobResult<T extends BaseNode> = Record<string, () => Promise<MarkdownInstance<T>>>;

export type Link = {
    url: string;
    label: string;
};

export type Image = {
    url: string;
    alt: string;
};

export interface BaseNode {
    url: string;
    type: string;
    title: string;
    description?: string;
    tags?: string[];
    featured?: boolean;
    draft?: boolean;
    published: string;
    updated?: string;
    abstract?: {
        text: string;
        markdown: string;
    };
    heroImage?: string | boolean;
    ogImage?: string;
    images: string[];
    autoHero?: ImageProps;
    links: {
        external: Link[];
        internal: Link[];
    };
    imageBaseDir: string;
    mdxFilename: string;
    [key: string]: unknown;
}

export type PageNode = BaseNode;

export type AboutNode = BaseNode & {
    thumbnail?: 'logo' | 'work' | 'story' | 'music';
};

export type TagNode = BaseNode & {
    count: number;
};

export type BlogPost = BaseNode;

export type MetaPage = BaseNode;

export type AstroNode<T extends Record<string, unknown>> = MarkdownLayoutProps<T>;
