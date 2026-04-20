import { getTokensOutputPath } from '../../site/styles/getTokensOutputPath.js';
import { runCommand } from '../exec/runCommand.js';
import { createWatcher } from './private/createWatcher.js';

const REGEXP_LOCALE_FILE = /([a-z]{2,})\.locale\.yml$/i;
const REGEXP_JS_FILE = /\.js$/i;

export function createBuildWatcher(config, wss) {
    const { outputDir: localeResourcesPath } = config.locale;
    const { paths: PATHS, watch } = config.build;
    const ignore = [...watch.ignore];

    const tokensOutputPath = getTokensOutputPath(config.build);
    ignore.push(REGEXP_LOCALE_FILE, tokensOutputPath, REGEXP_JS_FILE);

    async function rebuild(filePath) {
        const buildError = await runCommand('node', ['build/site.js']);
        if (buildError) {
            wss.notify('error', buildError.stderr || buildError.stdout);
            return;
        }

        const clientBuildError = await runCommand('node', ['build/app.js']);
        if (clientBuildError) {
            wss.notify('error', clientBuildError.stderr || clientBuildError.stdout);
            return;
        }

        wss.notify(filePath.endsWith('.css') ? 'css' : 'reload');
    }

    return createWatcher({
        label: 'build',
        paths: [PATHS.src, localeResourcesPath],
        ignore,
        callback: rebuild,
    });
}
