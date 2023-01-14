import type { MarkdownInstance } from 'astro';

import type { BlogPost } from './types';
import { globResultToArray } from './utils';

export const importAllMeta = async (): Promise<BlogPost[]> =>
    globResultToArray<BlogPost>(
        import.meta.glob<MarkdownInstance<BlogPost>>('../pages/meta/**/*.(md|mdx)'),
    );
