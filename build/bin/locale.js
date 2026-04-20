import { fileURLToPath } from 'url';

import { buildLocale } from '../buildLocale.js';
import { readConfig } from '../shared/config/readConfig.js';
import * as logger from '../shared/logger.js';

try {
    logger.title('build/locale');
    const config = await readConfig(fileURLToPath(import.meta.url), '../..');
    await buildLocale(config);
    logger.success('build/locale complete');
} catch (err) {
    logger.fatal(`build/locale failed`, err);
    process.exit(1);
}
