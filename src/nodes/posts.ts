import type { MDXInstance } from 'astro';

import { globResultToArray } from './private';
import type { BlogPost } from './types';

export async function fetchAllPosts(): Promise<BlogPost[]> {
    const pages = await globResultToArray<BlogPost>(
        import.meta.glob<MDXInstance<BlogPost>>('/src/pages/posts/**/*.(md|mdx)'),
    );

    return pages.filter(page => !page.url.startsWith('/posts/archive'));
}

type PreviousAndNext = {
    previous: BlogPost | undefined;
    next: BlogPost | undefined;
};

export function getPreviousAndNextPosts(posts: BlogPost[], post: BlogPost): PreviousAndNext {
    const index = posts.findIndex(p => p.title === post.title && p.published === post.published);
    return {
        previous: posts[index + 1],
        next: posts[index - 1],
    };
}
