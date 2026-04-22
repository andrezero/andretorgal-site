import * as logger from '../shared/logger.js';
import { loadLocaleFile } from './sources/loadLocaleSourceFile.js';
import { mergeLocaleData } from './sources/mergeLocaleData.js';
import { scanPathsForLocaleSources } from './sources/scanPathsForLocaleSources.js';

export async function loadLocaleData(languages, scanPaths) {
    const files = await scanPathsForLocaleSources(scanPaths);

    if (files.length === 0) {
        logger.warn(`No locale files found in scan paths: '${scanPaths.join(', ')}'.`);
        return;
    }
    logger.info(`Found ${files.length} locale files. Scanned ${scanPaths.length} paths.`);

    const promises = files.map(filePath => loadLocaleFile(filePath, languages));
    const resourceEntries = await Promise.all(promises);
    const entries = resourceEntries.flat().filter(d => d.error == undefined);
    const errors = resourceEntries.flat().filter(d => d.error !== undefined);

    const resourceMap = mergeLocaleData(entries);

    return { resourceMap, errors };
}
