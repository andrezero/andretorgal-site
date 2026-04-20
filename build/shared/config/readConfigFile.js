import fs from 'fs-extra';
import path from 'node:path';

import { ValidationError } from '../primitives/ValidationError.js';
import { ensureObject, ensureString } from '../primitives/validators.js';
import { ConfigError } from './ConfigError.js';
import { initBuildConfig } from './schema/initBuildConfig.js';
import { initLocaleConfig } from './schema/initLocaleConfig.js';
import { initServerConfig } from './schema/initServerConfig.js';
import { initSiteConfig } from './schema/initSiteConfig.js';

export async function readConfigFile(filePath) {
    try {
        const config = await fs.readJSON(filePath);
        const rootDir = ensureString(`rootDir`, config.rootDir, path.dirname(filePath));

        ensureObject('.', config);
        const site = initSiteConfig(config.site);
        const build = initBuildConfig(rootDir, config.build);
        const locale = initLocaleConfig(rootDir, config.locale);
        const server = initServerConfig();

        return {
            rootDir,
            build,
            locale,
            site,
            server,
        };
    } catch (error) {
        if (error instanceof ValidationError) {
            throw new ConfigError(`Invalid config file: '${filePath}'. ${error.message}`);
        }
        throw error;
    }
}
