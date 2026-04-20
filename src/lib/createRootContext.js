import { createBus } from './createBus.js';
import { createState } from './createState.js';

export function createRootContext() {
    return {
        state: createState(),
        bus: createBus(),
    };
}
