export function createInstanceContainer() {
    const instances = new Set();

    function add(instance) {
        instances.add(instance);
    }

    function remove(instance) {
        instances.delete(instance);
    }

    function destroyWithin(element) {
        for (const instance of [...instances]) {
            if (!instance.el) {
                continue;
            }
            if (!element.contains(instance.el)) {
                continue;
            }

            instance.destroy();
            instances.delete(instance);
        }
    }

    return {
        add,
        remove,
        destroyWithin,
    };
}
