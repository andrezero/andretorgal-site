import { toString } from 'mdast-util-to-string';
import { visit } from 'unist-util-visit';

export function externalLinks() {
    return function (tree, file) {
        const links = { internal: [], external: [] };

        visit(tree, 'element', node => {
            if (
                node.tagName === 'a' &&
                node.properties &&
                typeof node.properties.href === 'string'
            ) {
                const url = node.properties.href;
                const label = toString(node);
                const isAbsolute = /^[a-z]+:/.test(url) || url.startsWith('//');
                if (isAbsolute) {
                    node.properties.rel = 'noreferrer noopener';
                    node.properties['data-external'] = '';
                    links.external.push({ url, label });
                } else {
                    const base = url.split('/')[1];
                    node.properties['data-type'] = base;
                    links.internal.push({ url, label });
                }
            }
        });

        const { frontmatter } = file.data.astro;
        frontmatter.links = links;
    };
}
