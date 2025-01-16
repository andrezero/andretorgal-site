import type { Root } from 'mdast';

import type { RemarkPlugin } from '../types/RemarkPlugin';
import type { VFile } from '../types/VFile';

export function exposeRawContent(): RemarkPlugin {
    return function (_tree: Root, file: VFile): void {
        const { frontmatter } = file.data.astro;
        frontmatter.markdown = file.value;
    };
}
