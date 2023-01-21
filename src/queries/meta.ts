import type { MarkdownInstance } from 'astro';

import type { BlogPost } from './types';
import { globResultToArray } from './utils';

export async function importAllMeta(): Promise<BlogPost[]> {
    return globResultToArray<BlogPost>(
        import.meta.glob<MarkdownInstance<BlogPost>>('../pages/meta/**/*.(md|mdx)'),
    );
}
