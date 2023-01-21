import { dirname, resolve } from 'path';

import type { Image, Root } from 'mdast';
import { visit } from 'unist-util-visit';

import { IS_RELATIVE_LOCAL_IMAGE, IS_REMOTE_IMAGE } from '../images/utils/constants';
import type { RemarkPlugin } from '../types/RemarkPlugin';
import type { VFile } from '../types/VFile';

type Options = {
    baseDir: string;
};

export function autoImages(options: Options): RemarkPlugin {
    const { baseDir } = options;

    return function (tree: Root, file: VFile): void {
        const images: string[] = [];

        if (!file.history[0]) {
            return;
        }

        visit(tree, 'image', (node: Image) => {
            const { url } = node;
            if (IS_RELATIVE_LOCAL_IMAGE.test(url)) {
                const filename = resolve(dirname(file.history[0] || ''), url);
                const publicUrl = filename.replace(baseDir, '');
                images.push(publicUrl);
                node.url = publicUrl;
            } else if (IS_REMOTE_IMAGE.test(url)) {
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
        frontmatter.ogImage = ogImage || images[0] || heroImage;
    };
}
