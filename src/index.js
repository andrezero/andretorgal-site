import { createApp } from './app/app.js';
import { onReady } from './lib/onReady.js';

const app = createApp();

onReady(() => app.mount(document));
