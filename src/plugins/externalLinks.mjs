import { visit } from 'unist-util-visit';

export function externalLinks() {
    return function (tree, file) {
        const links = { internal: [], external: [] };
        file.data.astro.frontmatter.links = links;

        visit(tree, 'element', node => {
            if (
                node.tagName === 'a' &&
                node.properties &&
                typeof node.properties.href === 'string'
            ) {
                const url = node.properties.href;
                const isAbsolute = /^[a-z]+:/.test(url) || url.startsWith('//');
                if (isAbsolute) {
                    node.properties.rel = 'noreferrer noopener';
                    node.properties['data-external'] = '';
                    links.external.push(url);
                } else {
                    links.internal.push(url);
                }
            }
        });
    };
}
