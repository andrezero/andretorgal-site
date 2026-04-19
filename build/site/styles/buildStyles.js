import fs from 'fs-extra';
import path from 'node:path';

import * as logger from '../../shared/logger.js';
import { collectCSSFiles } from './collectCSSFiles.js';
import { concatFiles } from './concatFiles.js';
import { minifyCSS } from './minifyCSS.js';
import { writeCSS } from './writeCSS.js';

export async function buildStyles(buildConfig) {
    const { paths: PATHS, css } = buildConfig;

    const distDir = path.join(PATHS.assets);
    const layerFileName = css.layers.src || 'layer.css';

    logger.busy('Building CSS');
    await fs.ensureDir(distDir);

    const globalStyles = await collectCSSFiles(PATHS.styles);
    const componentStyles = await collectCSSFiles(PATHS.templates);
    const allFiles = [...globalStyles, ...componentStyles];

    if (allFiles.length === 0) {
        logger.warn(`No CSS files found in path: '${PATHS.styles}''.`);
        return;
    }

    const layerFiles = allFiles.filter(f => path.basename(f) === layerFileName);
    if (!layerFiles.length) {
        logger.warn(`No entry points named '${layerFileName}' found.`);
    }

    const otherFiles = allFiles.filter(f => path.basename(f) !== layerFileName);
    const orderedFiles = [...layerFiles, ...otherFiles];

    logger.info(`  - Found ${orderedFiles.length} CSS file(s), ${layerFiles.length} layer file(s)`);

    const combinedCSS = await concatFiles(orderedFiles);
    const minifiedCSS = await minifyCSS(combinedCSS, distDir);
    await writeCSS(minifiedCSS, distDir);

    logger.progress(`CSS build: '${distDir}'.`);
}
