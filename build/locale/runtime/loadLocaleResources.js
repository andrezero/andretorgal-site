import { readJsonFile } from '../../shared/fs/readJsonFile.js';
import { getMetaFromLocaleFilename } from './private/getMetaFromLocaleFilename.js';
import { scanPathsForLocaleData } from './private/scanPathsForLocaleData.js';

export async function loadLocaleResources(basePath) {
    const files = await scanPathsForLocaleData(basePath);

    const resources = {};
    for (const filePath of files) {
        const { lang } = getMetaFromLocaleFilename(filePath);

        if (resources[lang]) {
            throw new Error(`Duplicate locale file for lang: '${lang}' in: '${filePath}'`);
        }

        const data = await readJsonFile(filePath);
        resources[lang] = {
            translation: data,
        };
    }

    return resources;
}
