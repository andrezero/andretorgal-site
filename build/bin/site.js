import { fileURLToPath } from 'url';

import { buildSite } from '../buildSite.js';
import { readConfig } from '../shared/config/readConfig.js';
import * as logger from '../shared/logger.js';

try {
    const cssOnly = process.argv.find(arg => arg === '--css-only');
    logger.title(`build/site${cssOnly ? ' (css-only)' : ''}`);
    const config = await readConfig(fileURLToPath(import.meta.url), '../..');
    await buildSite(config, cssOnly);
    logger.success('build/site complete');
} catch (err) {
    logger.fatal(`build/site failed`, err);
    process.exit(1);
}
