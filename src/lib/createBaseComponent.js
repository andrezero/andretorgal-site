export function createBaseComponent(context, element) {
    const destroyers = new Set();

    function onDestroy(fn) {
        destroyers.add(fn);
    }

    function init() {}

    function destroy() {
        for (const fn of destroyers) fn();
        destroyers.clear();
    }

    return {
        context,
        el: element,
        init,
        destroy,
        onDestroy,
    };
}
