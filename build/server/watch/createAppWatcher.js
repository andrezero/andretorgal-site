import path from 'node:path';

import { runCommand } from '../exec/runCommand.js';
import { createWatcher } from './private/createWatcher.js';

const REGEXP_JS_FILE = /\.js$/i;

export function createAppWatcher(config, wss) {
    const { paths: PATHS, watch } = config.build;
    const { ignore } = watch || [];

    async function rebuild() {
        const buildError = await runCommand('node', ['build/bin/app.js']);
        if (buildError) {
            wss.notify('error', buildError.stderr || buildError.stdout);
            return;
        }
        wss.notify('reload');
    }

    return createWatcher({
        label: 'app',
        paths: [PATHS.src],
        ignore,
        filter: filePath => REGEXP_JS_FILE.test(path.basename(filePath)),
        callback: rebuild,
    });
}
