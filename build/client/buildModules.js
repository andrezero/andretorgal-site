import fs from 'fs-extra';
import path from 'node:path';

import * as logger from '../../shared/logger.js';
import { copyJSFiles } from './copyJSFiles.js';
import { formatBytes } from './formatBytes.js';
import { checkEntryFile } from './scan/checkEntryFile.js';
import { collectJSFiles } from './scan/collectJSFiles.js';

export async function buildModules(buildConfig) {
    const { paths: PATHS, js } = buildConfig;

    const srcDir = PATHS.src;
    const distDir = PATHS.assets;
    const entryFilePath = path.join(srcDir, js.entry);

    logger.busy('Building JS');

    await checkEntryFile(entryFilePath);
    await fs.ensureDir(distDir);

    const files = await collectJSFiles(srcDir);

    if (files.length === 0) {
        logger.warn(`No JS files found in path: '${srcDir}'.`);
        return;
    }

    logger.info(`  - Found ${files.length} JS file(s)`);

    const result = await copyJSFiles(files, srcDir, distDir);

    logger.progress(
        `JS build: '${distDir}' (${result.count} file(s), ${formatBytes(result.size)}).`,
    );
}
