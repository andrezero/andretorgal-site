import fs from 'fs-extra';
import path from 'node:path';
import { loadLocaleData } from './locale/loadLocaleData.js';
import * as logger from './shared/logger.js';

export async function buildLocale(config) {
    const { languages, scanPaths, outputDir } = config.locale;

    await fs.emptyDir(outputDir);
    await fs.ensureDir(outputDir);

    logger.busy('Scanning content');
    const { resourceMap, errors } = await loadLocaleData(languages, scanPaths);
    const entries = Array.from(resourceMap.entries());
    logger.info(`  - discovered ${entries.length} items.`);

    logger.busy('Generarting i18n resources');
    const promises = entries.map(([lang, localeResources]) => {
        const filePath = path.join(outputDir, `${lang}.locale.json`);
        const contents = JSON.stringify(localeResources);
        return fs.writeFile(filePath, contents);
    });

    await Promise.all(promises);

    logger.progress(`Generated ${entries.length} locale files in '${outputDir}'.`);

    if (errors.length) {
        logger.warn(`Errors in locale data: ${errors.length}`);
        throw errors[0];
    }
}
