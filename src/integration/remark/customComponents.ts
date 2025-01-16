import type { ObjectExpression } from 'estree';
import { createProgram } from 'm2dx-utils';
import type { Root, RootContent } from 'mdast';

import type { RemarkPlugin, VFile } from '../types';

import { findExportInMdx } from './common';

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
        const prog = createProgram(importStatement);
        tree.children.unshift(prog as unknown as RootContent);

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
            const prog = createProgram(src);
            tree.children.push(prog as unknown as RootContent);
        }
    };
}
