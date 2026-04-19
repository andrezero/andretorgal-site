import { spawn } from 'node:child_process';

import * as logger from '../../shared/logger.js';

export function runCommand(command, args = []) {
    return new Promise(resolve => {
        const logText = `${command} ${args.join([' '])}`;
        logger.busy(`Executing => '${logText}'`);

        const child = spawn(command, args);

        let stdout = '';
        let stderr = '';

        child.stdout.on('data', chunk => {
            const text = chunk.toString();
            stdout += text;
            process.stdout.write(text);
        });

        child.stderr.on('data', chunk => {
            const text = chunk.toString();
            stderr += text;
            process.stderr.write(text);
        });

        child.on('close', code => {
            logger.info(``);

            if (code !== 0) {
                logger.error(`Error <= '${logText}'`);
                resolve({
                    status: code,
                    stdout,
                    stderr,
                });
                return;
            }
            logger.progress(`Finished <='${logText}'`);
            resolve();
        });
    });
}
