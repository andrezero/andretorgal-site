import type { Root } from 'mdast';
import { toString } from 'mdast-util-to-string';
import type { Node } from 'unist';
import { visit } from 'unist-util-visit';

import type { RemarkPlugin, VFile } from '../types';

function fixPonctuation(str: string): string {
    return str.replace(/([.?!])([\w]+)/g, '$1 $2');
}

export function autoAbstract(): RemarkPlugin {
    return function (tree: Root, file: VFile): void {
        const { frontmatter } = file.data.astro;

        visit(tree, { type: 'mdxJsxFlowElement', name: 'Abstract' }, (node: Node) => {
            const normalised = fixPonctuation(toString(node));

            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const position = node.position;
            if (!position) {
                return;
            }
            const { start, end } = position;
            const markdown = file.value
                .split('\n')
                .slice(start.line, end.line - 1)
                .join('\n')
                .trim();
            frontmatter.abstract = { text: normalised, markdown };
        });
    };
}
