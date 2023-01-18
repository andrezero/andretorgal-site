import { createProgram } from 'm2dx-utils';
import { toLinux } from '../common/path.mjs';
import { findExportInMdx } from './findExportInMdx.mjs';

export function processFile(root, file) {
    const importStatement = `import { components as _ac0 } from '${toLinux(file)}';`;
    root.children.push(createProgram(importStatement));

    const found = findExportInMdx(root);
    if (found) {
        const init = found.init;
        init.properties = [
            { type: 'SpreadElement', argument: { type: 'Identifier', name: `_ac0` } },
            ...init.properties,
        ];
    } else {
        const src = `export const components = {..._ac0}`;
        root.children.push(createProgram(src));
    }
}
