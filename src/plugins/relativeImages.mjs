import { processFile } from './relativeImages/processFile.mjs';

export function relativeImages(options = {}) {
    const { componentsFile } = options;

    return async function transformer(root, file) {
        const dir = file.dirname;

        if (dir) {
            await processFile(root, dir, [componentsFile]);
        }
    };
}
