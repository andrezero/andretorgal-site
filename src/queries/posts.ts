import type { MarkdownInstance } from 'astro';

import type { BlogPost } from './types';
import { globResultToArray } from './utils';

export async function importAllPosts(): Promise<BlogPost[]> {
    return globResultToArray<BlogPost>(
        import.meta.glob<MarkdownInstance<BlogPost>>('../pages/posts/**/*.(md|mdx)'),
    );
}

type PreviousAndNext = {
    previous: BlogPost | undefined;
    next: BlogPost | undefined;
};

export function findPreviousAndNextPosts(posts: BlogPost[], post: BlogPost): PreviousAndNext {
    const index = posts.findIndex(p => p.title === post.title && p.published === post.published);
    return {
        previous: posts[index + 1],
        next: posts[index - 1],
    };
}
