import { visit } from 'unist-util-visit';

export function autoImages() {
    return function (tree, file) {
        const images = [];

        visit(tree, 'image', node => {
            if (node.type === 'image') {
                const { url, alt } = node;
                const isAbsolute = /^[a-z]+:/.test(url) || url.startsWith('//');
                if (!isAbsolute) {
                    images.push({ url, alt });
                }
            }
        });

        const { frontmatter } = file.data.astro;
        const { ogImage, heroImage } = frontmatter;
        frontmatter.images = images;
        frontmatter.ogImage = ogImage || images[0]?.url || heroImage;
    };
}
