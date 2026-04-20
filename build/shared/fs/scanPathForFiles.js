import fs from 'fs-extra';
import path from 'node:path';

import * as logger from '../logger.js';

export async function scanPathForFiles(basePath, assertFn) {
    const files = [];
    if (!(await fs.pathExists(basePath))) {
        logger.warn(`Directory not found: '${basePath}'`);
        return files;
    }

    const entries = await fs.readdir(basePath, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(basePath, entry.name);
        if (entry.isDirectory()) {
            const subFiles = await scanPathForFiles(fullPath, assertFn);
            files.push(...subFiles);
        } else if (entry.isFile() && assertFn(entry, basePath)) {
            files.push(fullPath);
        }
    }
    return files;
}
