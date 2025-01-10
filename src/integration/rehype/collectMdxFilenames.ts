import type { Root } from 'mdast';

import type { RemarkPlugin } from '../types/RemarkPlugin';
import type { VFile } from '../types/VFile';

export function collectMdxFilenames(): RemarkPlugin {
    return function (_tree: Root, file: VFile): void {
        const { frontmatter } = file.data.astro;
        frontmatter.filename = file.history[0];
    };
}
