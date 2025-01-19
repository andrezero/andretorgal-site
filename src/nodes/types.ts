import type { MDXInstance, MarkdownLayoutProps } from 'astro';

export type GlobResult<T extends BaseNode> = Record<string, () => Promise<MDXInstance<T>>>;

export type Link = {
    url: string;
    label?: string;
    icon?: string;
    description?: string;
    hide?: boolean;
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
        source?: string;
    };
    images: {
        external: Image[];
        internal: Image[];
    };
    links: Link[];
    likes?: string[];
    hero?: boolean | string | Image;
    thumb?: boolean | string | Image;
    og?: NodeOG;
    [key: string]: unknown;
}

export type PageNode = BaseNode & {
    type: 'page';
};

export type AboutNode = BaseNode & {
    thumbnail?: 'logo' | 'work' | 'story' | 'music';
};

export type TagNode = BaseNode & {
    count: number;
};

export type KindNode = BaseNode & {
    slug: string;
    count: number;
};

export type LikeBase = {
    wikipedia?: string;
    spotify?: string;
    github?: string;
};

type LikePerson = LikeBase & {
    kind: 'person';
};

type LikePlace = LikeBase & {
    kind: 'place';
};

type LikeAlbum = LikeBase & {
    kind: 'album';
};

type LikeMovie = LikeBase & {
    kind: 'movie';
};

type LikeBook = LikeBase & {
    kind: 'book';
};

type LikeCompany = LikeBase & {
    kind: 'company';
    homepage: string;
};

type LikeSoftware = LikeBase & {
    kind: 'software';
    code?: string;
    docs?: string;
};

type LikeSubject =
    | LikePerson
    | LikePlace
    | LikeAlbum
    | LikeMovie
    | LikeBook
    | LikeCompany
    | LikeSoftware;

export type LikeNode = BaseNode & {
    kind: string;
    data: Omit<LikeSubject, 'kind'>;
};

export type BlogPost = BaseNode;

export type MetaPage = BaseNode;

export type AstroNode<T extends Record<string, unknown>> = MarkdownLayoutProps<T>;
