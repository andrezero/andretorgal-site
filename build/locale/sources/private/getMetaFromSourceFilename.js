import path from 'node:path';

import { MULTI_LANG, REGEXP_LOCALE_SOURCE_FILE } from '../../constants.js';

export function getMetaFromSourceFilename(filePath) {
    const fileName = path.basename(filePath);
    const match = fileName.match(REGEXP_LOCALE_SOURCE_FILE);

    if (match) {
        const lang = match[1] ? match[1].toLowerCase() : MULTI_LANG;

        return {
            lang: lang,
        };
    }
}
