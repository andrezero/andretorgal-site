import type { ObjectExpression } from 'estree';
import { createProgram } from 'm2dx-utils';
import type { Root } from 'mdast';

import type { RemarkPlugin } from '../types/RemarkPlugin';
import type { VFile } from '../types/VFile';

import { findExportInMdx } from './common/findExportInMdx';

type Options = {
    componentsFile: string;
};

export function customComponents(options: Options): RemarkPlugin {
    const { componentsFile } = options;

    return async function (tree: Root, file: VFile): Promise<void> {
        const dir = file.dirname;

        if (!dir) {
            return;
        }

        const importStatement = `import { components as customComponents } from '${componentsFile}';`;
        tree.children.unshift(createProgram(importStatement));

        const found = findExportInMdx(tree);
        if (found && found.init) {
            const init = found.init as ObjectExpression;
            init.properties = [
                {
                    type: 'SpreadElement',
                    argument: { type: 'Identifier', name: `customComponents` },
                },
                ...init.properties,
            ];
        } else {
            const src = `export const components = {...customComponents}`;
            tree.children.push(createProgram(src));
        }
    };
}
