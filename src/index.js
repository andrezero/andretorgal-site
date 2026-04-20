import { createApp } from './app/app.js';
import { onReady } from './lib/onReady.js';

const app = createApp();

window._q = (selector, node) => (node || document).querySelector(selector);
window._qAll = (selector, node) => (node || document).querySelectorAll(selector);

onReady(() => app.mount(document));
