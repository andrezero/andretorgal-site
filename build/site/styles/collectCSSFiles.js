import fs from 'fs-extra';
import path from 'node:path';

export async function collectCSSFiles(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = [];

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files.push(...(await collectCSSFiles(fullPath)));
        } else if (entry.isFile() && entry.name.endsWith('.css')) {
            files.push(fullPath);
        }
    }
    return files;
}
