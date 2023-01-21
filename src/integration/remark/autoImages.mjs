import { dirname, resolve } from 'path';
import { visit } from 'unist-util-visit';

export function autoImages(options = {}) {
    const { baseDir } = options;

    return async function (tree, file) {
        const images = [];

        if (!file.history[0]) {
            return;
        }

        visit(tree, 'image', node => {
            const { url } = node;
            const isRelative = /^\.\.?\//.test(url);
            const isRemote = /^(https?:)?\/\//.test(url);
            if (isRelative) {
                const filename = resolve(dirname(file.history[0]), url);
                const publicUrl = filename.replace(baseDir, '');
                images.push(publicUrl);
                node.url = publicUrl;
            } else if (isRemote) {
                images.push(url);
            } else {
                throw new Error(
                    `Image "${url}" is neither relative or remote. If loading a local image make sure the path starts with "./" or "../"`,
                );
            }
        });

        const { frontmatter } = file.data.astro;
        const { ogImage, heroImage } = frontmatter;
        frontmatter.images = images;
        frontmatter.ogImage = ogImage || images[0]?.url || heroImage;
    };
}
