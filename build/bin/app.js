import { fileURLToPath } from 'node:url';

import { buildApp } from '../buildApp.js';
import { readConfig } from '../shared/config/readConfig.js';
import * as logger from '../shared/logger.js';

try {
    logger.title('build/app');
    const config = await readConfig(fileURLToPath(import.meta.url), '../..');
    await buildApp(config);
    logger.success('build/app complete');
} catch (err) {
    logger.fatal(`build/app failed`, err);
    process.exit(1);
}
