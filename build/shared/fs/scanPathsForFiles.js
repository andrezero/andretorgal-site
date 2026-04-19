import { scanPathForFiles } from './scanPathForFiles.js';
export async function scanPathsForFiles(basePaths, assertFn) {
    const filePromises = basePaths.map(basePath => scanPathForFiles(basePath, assertFn));
    const allFilesArrays = await Promise.all(filePromises);

    return allFilesArrays.flat();
}
