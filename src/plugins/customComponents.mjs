import { processFile } from './customComponents/processFile.mjs';

export function customComponents(options = {}) {
    const { componentsFile } = options;

    return async function transformer(root, file) {
        const dir = file.dirname;

        if (dir) {
            await processFile(root, componentsFile);
        }
    };
}
