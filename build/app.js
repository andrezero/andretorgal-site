import fs from 'fs-extra';
import path from 'node:path';

import { fileURLToPath } from 'node:url';
import { copyJSFiles } from './client/output/copyJSFiles.js';
import { formatBytes } from './client/output/formatBytes.js';
import { checkEntryFile } from './client/scan/checkEntryFile.js';
import { collectJSFiles } from './client/scan/collectJSFiles.js';
import { readConfig } from './shared/config/readConfig.js';
import * as logger from './shared/logger.js';

async function main(config) {
    const { paths: PATHS, js } = config.build;

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
    } else {
        logger.info(`  - found ${files.length} JS file(s).`);
    }

    const result = await copyJSFiles(files, srcDir, distDir);
    logger.progress(`  - copied (${result.count} file(s), ${formatBytes(result.size)}).`);

    logger.progress(`JS build: '${distDir}'`);
}

try {
    logger.title('build/app');
    const config = await readConfig(fileURLToPath(import.meta.url));
    await main(config);
    logger.success('build/app complete');
} catch (err) {
    logger.fatal(`build/app failed`, err);
    process.exit(1);
}
