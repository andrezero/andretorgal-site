import type { MarkdownInstance, MarkdownLayoutProps } from 'astro';

export type GlobResult<T extends BaseNode> = Record<string, () => Promise<MarkdownInstance<T>>>;

export type Link = {
    url: string;
    label: string;
};

export type Image = {
    src: string;
    alt: string;
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
    abstract?: {
        text: string;
        markdown: string;
    };
    images: {
        external: Image[];
        internal: Image[];
    };
    links: {
        external: Link[];
        internal: Link[];
    };
    hero?: boolean | string | Image;
    thumb?: boolean | string | Image;
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
