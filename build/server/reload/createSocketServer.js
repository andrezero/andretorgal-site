import { WebSocketServer } from 'ws';
import * as logger from '../../shared/logger.js';

export function createSocketServer(server) {
    const wss = new WebSocketServer({ server: server.http });

    wss.on('connection', ws => {
        logger.info('Client connected');
        ws.on('close', () => {
            logger.info('Client disconnected');
        });
    });

    const notify = (type, payload) => {
        wss.clients.forEach(client => {
            if (client.readyState === 1) {
                const message = JSON.stringify({ type, payload });
                client.send(message);
            }
        });
    };

    const api = {
        notify,
    };

    return api;
}
