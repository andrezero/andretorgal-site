import { readYamlFile } from '../../shared/fs/readYamlFile.js';
import * as logger from '../../shared/logger.js';
import { MULTI_LANG } from '../constants.js';
import { getMetaFromSourceFilename } from './private/getMetaFromSourceFilename.js';
import { getResourcesFromMultiLangSource } from './private/getResourcesFromMultiLangSource.js';
import { getResourcesFromSingleLangSource } from './private/getResourcesFromSingleLangSource.js';
import { validateLocaleData } from './private/validateLocaleData.js';

export async function loadLocaleFile(filePath, languages) {
    try {
        const meta = getMetaFromSourceFilename(filePath);
        if (!meta) {
            return;
        }

        const rawData = await readYamlFile(filePath);
        const data = validateLocaleData(rawData, filePath);

        if (!data) {
            return;
        }

        const source = { ...data, ...meta };
        const { lang } = meta;
        if (lang === MULTI_LANG) {
            return getResourcesFromMultiLangSource(source, languages);
        }
        return getResourcesFromSingleLangSource(source, languages);
    } catch (err) {
        logger.error(`Error processing file: '${filePath}': ${err.message}`);
        return { error: err };
    }
}
