import { createProgram } from 'm2dx-utils';
import { Exports } from './autoImports/Exports.mjs';
import { findUnresolved } from './autoImports/findUnresolved.mjs';
import { shortHash } from './common/shortHash.mjs';
import { capitalize, toCamelCase } from './common/strings.mjs';
import { toImport } from './common/typescript.mjs';

const CAPITAL_LETTER = /[A-Z]/;
export function isJsxName(name) {
    return !!name && name.length > 0 && CAPITAL_LETTER.test(name.charAt(0));
}

export function autoImports(options = {}) {
    const { autoImportsFailUnresolved: failUnresolved = false, autoImportFile } = options;

    return async function transformer(root, file) {
        const dir = file.dirname;

        if (!dir) {
            return;
        }

        const unresolved = findUnresolved(root);
        if (unresolved.length === 0) return;
        const exports = new Exports(autoImportFile, isJsxName);
        const imports = [];
        for (const u of unresolved) {
            const e = await exports.find(u.name);
            if (e) {
                const alias = capitalize(toCamelCase(`${e.name}__${shortHash(e.file)}`));
                u.name = `${alias}.${u.name}`;
                if (!imports.includes(alias)) {
                    imports.push(alias);
                    root.children.unshift(createProgram(toImport(e, alias)));
                }
            } else if (failUnresolved) {
                throw new Error(
                    `JSX component <${u.name}> cannot be resolved, please import it explicitly in your MDX file or add an autoImport with astro-m2dx, see https://astro-m2dx.netlify.app/options/auto-imports how to do that`,
                );
            }
        }
    };
}
