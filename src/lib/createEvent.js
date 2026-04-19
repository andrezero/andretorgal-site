export function createEvent() {
    const listeners = new Set();

    function on(fn) {
        listeners.add(fn);

        return () => {
            listeners.delete(fn);
        };
    }

    function trigger(...args) {
        for (const fn of listeners) {
            fn(...args);
        }
    }

    function clear() {
        listeners.clear();
    }

    return [on, trigger, clear];
}
