import fs from 'fs-extra';
import path from 'node:path';

export async function copyJSFile(srcFile, destFile) {
    await fs.ensureDir(path.dirname(destFile));
    await fs.copyFile(srcFile, destFile);
}
