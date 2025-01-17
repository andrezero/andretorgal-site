import rehypeFormat from 'rehype-format';
import rehypeStringify from 'rehype-stringify';
import remarkEmoji from 'remark-emoji';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

import { rehypeInsertHero } from './rehypeInsertHero';
import { rehypeTransformLinks } from './rehypeTransformLinks';

import { SITE_URL } from '~/config';
import type { BaseNode } from '~/nodes';

export async function render(node: BaseNode): Promise<string> {
    const file = await unified()
        .use(remarkParse)
        .use(remarkEmoji)
        .use(remarkRehype)
        .use(rehypeInsertHero, node)
        .use(rehypeTransformLinks, SITE_URL, node)
        .use(rehypeFormat)
        .use(rehypeStringify)
        .process(node.markdown);
    return file.toString();
}
