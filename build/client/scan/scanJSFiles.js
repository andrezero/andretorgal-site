import fs from 'fs-extra';
import path from 'node:path';

import { isJSFile } from './isJSFile.js';

export async function scanJSFiles(dir, files) {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
        const filePath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            await scanJSFiles(filePath, files);
            continue;
        }

        if (!isJSFile(filePath)) {
            continue;
        }

        files.push(filePath);
    }
}
