import type { MarkdownLayoutProps } from 'astro';

export interface BaseNode {
    url: string;
    type: string;
    title: string;
    description?: string;
    published: string;
    updated?: string;
    heroImage?: string;
    tags?: string[];
    featured?: boolean;
    [key: string]: unknown;
}

export type TagNode = BaseNode & {
    count: number;
};

export type BlogPost = BaseNode;

export type MetaPage = BaseNode;

export type AstroNode<T extends Record<string, unknown>> = MarkdownLayoutProps<T>;
