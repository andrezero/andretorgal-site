export function createState() {
    const values = new Map();
    const subscribers = new Map();

    function set(key, value) {
        values.set(key, value);

        const list = subscribers.get(key);
        if (!list) {
            return;
        }

        for (const fn of list) {
            fn(value);
        }
    }

    function get(key, fn) {
        if (!subscribers.has(key)) {
            subscribers.set(key, new Set());
        }
        subscribers.get(key).add(fn);

        return () => subscribers.get(key).delete(fn);
    }

    return {
        set,
        get,
    };
}
