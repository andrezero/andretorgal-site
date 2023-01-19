import { toString } from 'mdast-util-to-string';
import { visit } from 'unist-util-visit';

function fixPonctuation(str) {
    return str.replace(/([.?!])([\w]+)/g, '$1 $2');
}

export function autoAbstract() {
    return function (tree, file) {
        const { frontmatter } = file.data.astro;
        visit(tree, { type: 'mdxJsxFlowElement', name: 'Abstract' }, node => {
            const normalised = fixPonctuation(toString(node));
            const { start, end } = node.position;
            const markdown = file.value
                .split('\n')
                .slice(start.line, end.line - 1)
                // .filter(line => !line.startsWith('##'))
                .join('\n')
                .trim();
            frontmatter.abstract = { text: normalised, markdown };
        });
    };
}
