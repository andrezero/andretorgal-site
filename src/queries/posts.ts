import type { MarkdownInstance } from 'astro';

import type { BlogPost } from './types';
import { globResultToArray } from './utils';

export const importAllPosts = async (): Promise<BlogPost[]> =>
    globResultToArray<BlogPost>(
        import.meta.glob<MarkdownInstance<BlogPost>>('../pages/posts/**/*.(md|mdx)'),
    );

export const sortedPosts = (nodes: BlogPost[]): BlogPost[] => {
    return nodes.sort((a, b) => new Date(b.published).valueOf() - new Date(a.published).valueOf());
};

type PreviousAndNext = {
    previous: BlogPost | undefined;
    next: BlogPost | undefined;
};

export const findPreviousAndNextPosts = (posts: BlogPost[], post: BlogPost): PreviousAndNext => {
    const index = posts.findIndex(p => p.title === post.title && p.published === post.published);
    return {
        previous: posts[index + 1],
        next: posts[index - 1],
    };
};
