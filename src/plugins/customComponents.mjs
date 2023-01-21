import { createProgram } from 'm2dx-utils';
import { findExportInMdx } from './common/findExportInMdx.mjs';

export function customComponents(options = {}) {
    const { componentsFile } = options;

    return async function transformer(root, file) {
        const dir = file.dirname;

        if (!dir) {
            return;
        }

        const importStatement = `import { components as customComponents } from '${componentsFile}';`;
        root.children.unshift(createProgram(importStatement));

        const found = findExportInMdx(root);
        if (found) {
            const init = found.init;
            init.properties = [
                {
                    type: 'SpreadElement',
                    argument: { type: 'Identifier', name: `customComponents` },
                },
                ...init.properties,
            ];
        } else {
            const src = `export const components = {...customComponents}`;
            root.children.push(createProgram(src));
        }
    };
}
