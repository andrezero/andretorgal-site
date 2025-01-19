import type { Link } from '@nodes/index';
import type { Root } from 'mdast';
import { toString } from 'mdast-util-to-string';
import { visit } from 'unist-util-visit';

import { isAbsolute } from '../../utils';
import type { RemarkPlugin } from '../types/';
import type { VFile } from '../types/VFile';

type LinkNode = {
    tagName: string;
    properties?: {
        href?: string;
        rel?: string;
        'data-external'?: string;
        'data-type'?: string | undefined;
    };
};

export function collectAndDecorateLinks(): RemarkPlugin {
    return function (tree: Root, file: VFile): void {
        const { frontmatter } = file.data.astro;
        const links: Link[] = (frontmatter.links as Link[]) || [];

        function addLink(link: Link) {
            const found = links.find(l => l.url === link.url);
            if (!found) {
                links.push(link);
            }
        }

        visit(tree, 'element', (node: LinkNode) => {
            if (
                node.tagName === 'a' &&
                node.properties &&
                typeof node.properties.href === 'string'
            ) {
                const url = node.properties.href;
                const label = toString(node);

                if (isAbsolute(url)) {
                    node.properties.rel = 'noopener';
                    node.properties['data-external'] = '';
                    addLink({ url, label });
                } else {
                    const base = url.split('/')[1];
                    node.properties['data-type'] = base;
                    addLink({ url, label });
                }
            }
        });

        frontmatter.links = links;
    };
}
