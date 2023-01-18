import { processFile } from './autoImports/processFile.mjs';

export function autoImports(options = {}) {
    const { autoImportsFailUnresolved: optAutoImportsFailUnresolved = false, autoImportFile } =
        options;

    return async function transformer(root, file) {
        const dir = file.dirname;

        if (dir) {
            await processFile(root, autoImportFile, optAutoImportsFailUnresolved);
        }
    };
}
