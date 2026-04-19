import path from 'node:path';

import { REGEXP_LOCALE_SOURCE_FILE } from '../../locale/constants.js';
import { runCommand } from '../exec/runCommand.js';
import { createWatcher } from './private/createWatcher.js';

export function createLocalesWatcher(config, wss) {
    const { scanPaths, watch } = config.locale;
    const { ignore } = watch || [];

    async function rebuild(filePath) {
        const buildError = await runCommand('node', ['build/locale.js']);
        if (buildError) {
            wss.notify('error', error.stderr || error.stdout);
            return;
        }
    }

    return createWatcher({
        label: 'locale',
        paths: scanPaths,
        ignore,
        filter: filePath => REGEXP_LOCALE_SOURCE_FILE.test(path.basename(filePath)),
        callback: rebuild,
    });
}
