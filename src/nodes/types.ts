import type { MDXInstance, MarkdownLayoutProps } from 'astro';

export type GlobResult<T extends BaseNode> = Record<string, () => Promise<MDXInstance<T>>>;

export type Link = {
    url: string;
    label: string;
};

export type Image = {
    src: string;
    alt: string;
};

export type NodeOG = {
    image: string | Image;
    description?: string;
};

export type NodeImageMeta = {
    href: string;
    alt: string;
    width: string;
    height: string;
    type: string;
};

export type NodeMeta = {
    type: string;
    title: string;
    image: NodeImageMeta;
    description: string;
    feed: string | undefined;
};

export interface BaseNode {
    filename: string;
    url: string;
    type: string;
    title: string;
    description?: string;
    tags?: string[];
    featured?: boolean;
    draft?: boolean;
    published: string;
    updated?: string;
    markdown: string;
    abstract?: {
        text: string;
        markdown: string;
    };
    images: {
        external: Image[];
        internal: Image[];
    };
    links: string[];
    urls: {
        external: Link[];
        internal: Link[];
    };
    hero?: boolean | string | Image;
    thumb?: boolean | string | Image;
    og?: NodeOG;
    [key: string]: unknown;
}

export type PageNode = BaseNode;

export type AboutNode = BaseNode & {
    thumbnail?: 'logo' | 'work' | 'story' | 'music';
};

export type TagNode = BaseNode & {
    count: number;
};

export type PersonLink = {
    kind: 'person';
};

export type LinkNode = BaseNode & {
    count: number;
};

export type BlogPost = BaseNode;

export type MetaPage = BaseNode;

export type AstroNode<T extends Record<string, unknown>> = MarkdownLayoutProps<T>;
