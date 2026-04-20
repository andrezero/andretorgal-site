import { scanPathsForFiles } from '../../shared/fs/scanPathsForFiles.js';
import { REGEXP_LOCALE_SOURCE_FILE } from '../constants.js';

export async function scanPathsForLocaleSources(basePaths) {
    const assertFn = entry => REGEXP_LOCALE_SOURCE_FILE.test(entry.name);
    return scanPathsForFiles(basePaths, assertFn);
}
