import type { MarkdownInstance } from 'astro';

import type { BlogPost } from './types';
import { globResultToArray } from './utils';

export const importAllNodes = async (): Promise<BlogPost[]> =>
    globResultToArray<BlogPost>(
        import.meta.glob<MarkdownInstance<BlogPost>>('../pages/**/*.(md|mdx)'),
    );
