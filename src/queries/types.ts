import type { MarkdownInstance, MarkdownLayoutProps } from 'astro';

export type GlobResult<T extends BaseNode> = Record<string, () => Promise<MarkdownInstance<T>>>;

export type Link = {
    url: string;
    label: string;
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
    image?: string | boolean;
    images: string[];
    links: {
        external: Link[];
        internal: Link[];
    };
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
