import { ensureNumber, ensureObject } from '../../primitives/validators.js';

export function initServerConfig(data) {
    const config = ensureObject(`server`, data, {});

    const port = ensureNumber(`server.port`, config.port, 3456);

    return {
        port,
    };
}
