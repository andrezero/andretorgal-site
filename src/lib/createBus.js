export function createBus() {
    const events = new Map();

    function emit(type, payload) {
        const list = events.get(type);
        if (!list) {
            return;
        }
        for (const fn of list) {
            fn(payload);
        }
    }

    function on(type, fn) {
        if (!events.has(type)) {
            events.set(type, new Set());
        }
        events.get(type).add(fn);

        return () => events.get(type).delete(fn);
    }

    return {
        emit,
        on,
    };
}
