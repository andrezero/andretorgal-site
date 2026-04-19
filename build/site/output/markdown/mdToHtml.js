// import rehypeFormat from 'rehype-format';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

import { rewriteLinksPlugin } from './plugins/rewriteLinksPlugin.js';

const sanitizeSchema = {
    tagNames: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'p',
        'br',
        'hr',
        'strong',
        'em',
        'del',
        'code',
        'pre',
        'blockquote',
        'ul',
        'ol',
        'li',
        'a',
        'img',

        'div',
        'span',
        'iframe',
        'video',
        'audio',
        'source',
        'track',
    ],
    attributes: {
        '*': ['class', 'id', 'style', 'title'],
        a: ['href', 'rel', 'target'],
        img: ['src', 'alt', 'width', 'height'],
        iframe: ['src', 'width', 'height', 'frameborder', 'allow', 'allowfullscreen'],
        video: ['src', 'controls', 'autoplay', 'loop', 'muted', 'poster'],
    },
    // clobberPrefix: '',
};

export async function mdToHtml(siteIndex, entry, defaultLang) {
    const processor = await unified()
        .use(remarkParse)
        .use(rewriteLinksPlugin, siteIndex, entry, defaultLang)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        // .use(rehypeFormat)
        .use(rehypeStringify);

    const result = await processor.process(entry.raw);
    return result.toString();
}
