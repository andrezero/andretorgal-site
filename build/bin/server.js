import { fileURLToPath } from 'url';

import { runCommand } from '../server/exec/runCommand.js';
import { createHttpServer } from '../server/http/createHttpServer.js';
import { createSocketServer } from '../server/reload/createSocketServer.js';
import { createAppWatcher } from '../server/watch/createAppWatcher.js';
import { createBuildWatcher } from '../server/watch/createBuildWatcher.js';
import { createLocalesWatcher } from '../server/watch/createLocalesWatcher.js';
import { readConfig } from '../shared/config/readConfig.js';
import * as logger from '../shared/logger.js';

async function main(config) {
    const { port = process.env.PORT } = config.server;
    const { dist: distPath } = config.build.paths;
    const { defaultLang } = config.locale;

    const server = createHttpServer(port, distPath, `/${defaultLang}/`, port => {
        logger.box(`Dev server running at http://localhost:${port}`);
    });
    const wss = createSocketServer(server);

    const buildErrors = [];

    const localeBuildError = await runCommand('node', ['build/bin/locale.js']);
    if (localeBuildError) {
        buildErrors.push(localeBuildError);
        logger.info('...attempting to continue...');
    }
    const siteBuildError = await runCommand('node', ['build/bin/site.js']);
    if (siteBuildError) {
        buildErrors.push(siteBuildError);
        logger.info('...attempting to continue...');
    }
    const appBuildError = await runCommand('node', ['build/bin/app.js']);
    if (appBuildError) {
        buildErrors.push(appBuildError);
        logger.info('...attempting to continue...');
    }

    if (buildErrors.length) {
        logger.info();
        logger.warn(`Build tasks with errors: ${buildErrors.length}`);
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
    const config = await readConfig(fileURLToPath(import.meta.url), '../..');
    await main(config);
} catch (err) {
    logger.fatal(`build/server crashed`, err);
    process.exit(1);
}
