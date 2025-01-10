import type { MarkdownInstance } from 'astro';

import type { BlogPost } from './types';
import { globResultToArray } from './utils';

export async function fetchAllMeta(): Promise<BlogPost[]> {
    return globResultToArray<BlogPost>(
        import.meta.glob<MarkdownInstance<BlogPost>>('/src/pages/meta/**/*.(md|mdx)'),
    );
}
