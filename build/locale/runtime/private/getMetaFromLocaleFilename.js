import path from 'node:path';

import { REGEXP_LOCALE_FILE } from '../../constants.js';

export function getMetaFromLocaleFilename(filePath) {
    const fileName = path.basename(filePath);
    const match = fileName.match(REGEXP_LOCALE_FILE);

    if (!match) {
        throw new Error(`Invalid lang file: '${filePath}'`);
    }

    const lang = match[1].toLowerCase();

    return {
        lang: lang,
    };
}
