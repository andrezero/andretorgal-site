import path from 'node:path';

import * as logger from '../../shared/logger.js';
import { ConfigError } from './ConfigError.js';
import { readConfigFile } from './readConfigFile.js';

export async function readConfig(_filename, relativeRoot) {
    const __dirname = path.dirname(_filename);

    const rootDir = path.resolve(__dirname, relativeRoot);
    const filePath = path.join(rootDir, 'config.json');

    logger.info(`Using config: ${filePath}`);

    try {
        const config = await readConfigFile(filePath);
        return config;
    } catch (error) {
        if (error instanceof ConfigError) {
            logger.error(error);
            process.exit(1);
        }
        throw error;
    }
}
