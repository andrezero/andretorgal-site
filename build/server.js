import { fileURLToPath } from 'url';

import { runCommand } from './server/exec/runCommand.js';
import { createHttpServer } from './server/http/createHttpServer.js';
import { createSocketServer } from './server/reload/createSocketServer.js';
import { createAppWatcher } from './server/watch/createAppWatcher.js';
import { createBuildWatcher } from './server/watch/createBuildWatcher.js';
import { createLocalesWatcher } from './server/watch/createLocalesWatcher.js';
import { readConfig } from './shared/config/readConfig.js';
import * as logger from './shared/logger.js';

async function main(config) {
    const { port = process.env.PORT } = config.server;
    const { dist: distPath } = config.build.paths;
    const { defaultLang } = config.locale;

    const server = createHttpServer(port, distPath, `/${defaultLang}/`);
    const wss = createSocketServer(server);

    const localeBuildError = await runCommand('node', ['build/locale.js']);
    if (localeBuildError) {
        console.info('...attempting to continue...');
        return;
    }
    const siteBuildError = await runCommand('node', ['build/site.js']);
    if (siteBuildError) {
        console.info('...attempting to continue...');
        return;
    }
    const appBuildError = await runCommand('node', ['build/app.js']);
    if (appBuildError) {
        console.info('...attempting to continue...');
        return;
    }

    const localeWatcher = createLocalesWatcher(config, wss);
    const buildWatcher = createBuildWatcher(config, wss);
    const clientWatcher = createAppWatcher(config, wss);

    logger.busy('Starting server');
    server.listen();

    process.on('SIGINT', () => {
        logger.busy('\nShutting down server');
        clientWatcher.close();
        buildWatcher.close();
        localeWatcher.close();
        server.close();
        process.exit(0);
    });
}

process.on('uncaughtException', err => {
    if (err.code === 'EADDRINUSE') {
        logger.error(`Port ${PORT} is already in use.`);
        logger.info('Stop the other process running on this port.');
        process.exit(1);
    }
    logger.fatal('build/server crashed', err);
    process.exit(1);
});

try {
    logger.title('build/server');
    const config = await readConfig(fileURLToPath(import.meta.url));
    await main(config);
} catch (err) {
    logger.fatal(`build/server crashed`, err);
    process.exit(1);
}
