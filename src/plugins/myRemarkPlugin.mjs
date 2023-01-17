import { visit } from 'unist-util-visit';

export function myRemarkPlugin() {
    return tree => {
        visit(tree, 'image', node => {
            const match = node.alt && node.alt.match(/^\/([a-z0-9=&]+)\//);
            const str = match && match[1];

            if (!str) {
                return;
            }

            const params = parseParams(str);
            console.log(node.alt, str, params);

            node.width = params?.w;
            node.height = params?.h;

            console.log(node);
        });
    };
}

const parseParams = str =>
    str
        .split('&')
        .map(p => p.split('='))
        .reduce((acc, [k, v]) => {
            acc[k] = v;
            return acc;
        }, {});
