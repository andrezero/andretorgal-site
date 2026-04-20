import { scanPathForFiles } from '../../../shared/fs/scanPathForFiles.js';
import { REGEXP_LOCALE_FILE } from '../../constants.js';

export async function scanPathsForLocaleData(basePath) {
    const assertFn = entry => REGEXP_LOCALE_FILE.test(entry.name);
    return await scanPathForFiles(basePath, assertFn);
}
