import fs from 'fs-extra';
import path from 'node:path';

import * as logger from '../../shared/logger.js';

export async function writeCSS(css, distDir) {
    await fs.writeFile(path.join(distDir, 'index.css'), css);
    logger.info(`  - style.css: ${(Buffer.byteLength(css) / 1024).toFixed(2)} KB`);
}
