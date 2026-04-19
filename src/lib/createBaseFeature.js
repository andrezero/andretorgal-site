import { createEvent } from './createEvent.js';

export function createBaseFeature(context) {
    const [onDestroy, emitDestroy, clearDestroyListeners] = createEvent();

    function init() {}

    function destroy() {
        for (const fn of destroyers) {
            fn();
        }
        emitDestroy();
        clearDestroyListeners();
    }

    return {
        context,
        init,
        destroy,
        onDestroy,
    };
}
