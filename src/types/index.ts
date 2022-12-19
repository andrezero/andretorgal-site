export interface BaseNode {
  url: string;
  type: string;
  title: string;
  description?: string;
  published: string;
  updated?: string;
  heroImage?: string;
  tags?: string[];
}

export type TagNode = BaseNode & {
  count: number;
};

export type BlogPost = BaseNode & {
  featured?: boolean;
};

export type MetaPage = BaseNode;

export interface AstroNode<T> {
  url: string;
  frontmatter: T;
}
