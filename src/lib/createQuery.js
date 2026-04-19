export function createQuery(selectorFn, onAdd, onRemove) {
    let prev = new Set();
    let current = new Set();

    function refresh(root) {
        current = new Set(selectorFn(root));

        // added
        for (const el of current) {
            if (!prev.has(el)) {
                onAdd?.(el);
            }
        }

        // removed
        for (const el of prev) {
            if (!current.has(el)) {
                onRemove?.(el);
            }
        }

        prev = current;
    }

    function items() {
        return [...current];
    }

    function destroy() {
        prev.clear();
        current.clear();
    }

    return {
        refresh,
        items,
        destroy,
    };
}
