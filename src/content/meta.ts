import type { MDXInstance } from 'astro';

import { globResultToArray } from './private';
import type { BlogPost } from './types';

export async function fetchAllMeta(): Promise<BlogPost[]> {
    return globResultToArray<BlogPost>(
        import.meta.glob<MDXInstance<BlogPost>>('/src/pages/meta/**/*.(md|mdx)'),
    );
}
