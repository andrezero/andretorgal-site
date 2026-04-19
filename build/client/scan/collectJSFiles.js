import { scanJSFiles } from './scanJSFiles.js';

export async function collectJSFiles(rootDir) {
    const files = [];

    await scanJSFiles(rootDir, files);

    return files;
}
