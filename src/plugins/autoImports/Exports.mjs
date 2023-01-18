/* eslint-disable security/detect-object-injection */
import { EXIT, visit } from 'estree-util-visit';
import { readFile } from 'fs/promises';
import {
    isExportDefaultDeclaration,
    isIdentifier,
    isObjectExpression,
    isProperty,
    isVariableDeclarator,
    parseEsm,
} from 'm2dx-utils';

export class Exports {
    constructor(file, nameFilter) {
        /** File name to array of Export elements */
        this.file = file;
        this.nameFilter = nameFilter;
        this.exports = {};
    }

    async find(name) {
        if (!name) return null;

        let exports = this.exports[this.file];
        if (!exports) {
            const src = await readFile(this.file, 'utf8');
            exports = parseExports(src, this.nameFilter).map(p => {
                return { ...p, file: this.file };
            });
            this.exports[this.file] = exports;
        }
        const found = exports.find(e => e.identifiers.includes(name));
        if (found) {
            return found;
        }

        return null;
    }
}

export function parseExports(src, predicate) {
    const root = parseEsm(src);
    const defaultExport = findDefaultExport(root);
    return findDeclarators(root, predicate, defaultExport);
}

function findDefaultExport(root) {
    let name;
    visit(root, n => {
        if (isExportDefaultDeclaration(n)) {
            name = n.declaration.name;
            return EXIT;
        }
    });
    return name;
}

function findDeclarators(root, predicate, defaultExport) {
    const result = [];
    visit(root, (n, k, i, ancestors) => {
        if (isVariableDeclarator(n)) {
            const declaration = ancestors[ancestors.length - 1];
            const init = n.init;
            if (declaration.kind === 'const' && isObjectExpression(init)) {
                const name = n.id.name;
                const isDefault = name === defaultExport;
                if (
                    isDefault ||
                    ancestors[ancestors.length - 2].type === 'ExportNamedDeclaration'
                ) {
                    const identifiers = init.properties
                        .filter(isProperty)
                        .map(p => p.key)
                        .map(k => getName(k))
                        .filter(predicate);
                    if (identifiers.length > 0) {
                        result.push({
                            name,
                            identifiers,
                            isDefault,
                        });
                    }
                }
            }
        }
    });
    return result;
}

function getName(key) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return isIdentifier(key) ? key.name : key.value ?? `Unknown type for key: ${key.type}`;
}
