import type { MarkdownInstance } from 'astro';

import type { BlogPost } from './types';
import { globResultToArray } from './utils';

export async function importAllNodes(): Promise<BlogPost[]> {
    return globResultToArray<BlogPost>(
        import.meta.glob<MarkdownInstance<BlogPost>>('../pages/**/*.(md|mdx)'),
    );
}
