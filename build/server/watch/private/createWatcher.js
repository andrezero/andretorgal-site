import chokidar from 'chokidar';

import * as logger from '../../../shared/logger.js';

const WATCH_DEBOUNCE_MS = 200;
const REGEXP_DOT_FILES = /(^|[\/\\])\./;

export function createWatcher(options) {
    const { label, paths, ignore, filter, callback } = options;
    const ignorePatterns = (ignore || []).map(i => new RegExp(i));
    ignorePatterns.push(REGEXP_DOT_FILES);

    logger.busy(`Start '${label}' watcher`);
    logger.info(`- watching: '${paths.join(', ')}`);
    logger.info(`- ignoring: '${ignorePatterns.join(', ')}`);

    const watcher = chokidar.watch(paths, {
        persistent: true,
        ignoreInitial: true,
    });

    let debounceTimeout;

    watcher.on('all', (event, filePath) => {
        if (ignorePatterns.find(pattern => pattern.test(filePath))) {
            return;
        }

        if (filter && !filter(filePath, event)) {
            return;
        }

        logger.info(`Change in '${label}' watcher: '${filePath}'.`);

        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => callback(filePath), WATCH_DEBOUNCE_MS);
    });

    return watcher;
}
