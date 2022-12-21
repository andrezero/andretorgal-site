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
}

export type TagNode = BaseNode & {
  count: number;
};

export type BlogPost = BaseNode;

export type MetaPage = BaseNode;

export interface AstroNode<T> {
  url: string;
  frontmatter: T;
}
