import { copyJSFile } from './copyJSFile.js';
import { getFileStat } from './getFileStat.js';
import { resolveOutputPath } from './resolveOutputPath.js';

export async function copyJSFiles(files, srcDir, distDir) {
    let count = 0;
    let size = 0;

    for (const srcFile of files) {
        const stat = await getFileStat(srcFile);
        const destFile = resolveOutputPath(srcFile, srcDir, distDir);

        await copyJSFile(srcFile, destFile);

        count += 1;
        size += stat.size;
    }

    return {
        count,
        size,
    };
}
