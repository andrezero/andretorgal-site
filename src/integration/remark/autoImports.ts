import { createProgram } from 'm2dx-utils';
import type { Root, RootContent } from 'mdast';

import type { RemarkPlugin, VFile } from '../types';

import { findUnresolved, getExports, toImport } from './auto-imports';
import { capitalize, shortHash, toCamelCase } from './common';

type Options = {
    autoImportFile: string;
};

export function autoImports(options: Options): RemarkPlugin {
    const { autoImportFile } = options;

    return async function (tree: Root, file: VFile) {
        const dir = file.dirname;

        if (!dir) {
            return;
        }

        const unresolved = findUnresolved(tree);
        if (unresolved.length === 0) {
            return;
        }

        const exportStatements = await getExports(autoImportFile);
        const imports: string[] = [];
        for (const variable of unresolved) {
            const variableName = variable.name;
            if (typeof variableName !== 'string') {
                continue;
            }
            const exp = exportStatements.find(e => e.identifiers.includes(variableName));
            if (exp) {
                const alias = capitalize(toCamelCase(`${exp.name}__${shortHash(exp.file)}`));
                variable.name = `${alias}.${variable.name}`;
                if (!imports.includes(alias)) {
                    imports.push(alias);
                    const program = createProgram(toImport(exp, alias));
                    tree.children.unshift(program as unknown as RootContent);
                }
            } else {
                throw new Error(
                    `JSX variable <${variable.name}> cannot be resolved, please import it explicitly in your MDX file or add an autoImport with astro-m2dx, see https://astro-m2dx.netlify.app/options/auto-imports how to do that`,
                );
            }
        }
    };
}
