import type { Image, Root } from 'mdast';
import { visit } from 'unist-util-visit';

import { getPublicPath } from '../images/utils/getPublicPath';
import type { RemarkPlugin } from '../types/RemarkPlugin';
import type { VFile } from '../types/VFile';

type Options = {
    baseDir: string;
};

export function autoImages(options: Options): RemarkPlugin {
    const { baseDir } = options;

    return function (tree: Root, file: VFile): void {
        const images: string[] = [];

        const mdxFilename = file.history[0];

        if (!mdxFilename) {
            return;
        }

        visit(tree, 'image', (node: Image) => {
            const { url } = node;
            const publicPath = getPublicPath(baseDir, mdxFilename, url);
            node.url = publicPath;
            images.push(publicPath);
        });

        const { frontmatter } = file.data.astro;
        frontmatter.images = images;
        frontmatter.imageBaseDir = baseDir;
        frontmatter.mdxFilename = mdxFilename;
    };
}
