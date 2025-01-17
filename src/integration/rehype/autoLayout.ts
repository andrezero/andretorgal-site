import type { BaseNode } from '@nodes/index';
import type { Root } from 'mdast';

import type { RemarkPlugin } from '../types/RemarkPlugin';
import type { VFile } from '../types/VFile';

export function autoLayout(layoutMap: Record<string, string>, defaultLayout: string): RemarkPlugin {
    return function (_tree: Root, file: VFile): void {
        const { frontmatter } = file.data.astro;
        const { layout, type } = frontmatter as BaseNode;
        // eslint-disable-next-line security/detect-object-injection
        frontmatter.layout = layout || layoutMap[type] || defaultLayout;
    };
}
