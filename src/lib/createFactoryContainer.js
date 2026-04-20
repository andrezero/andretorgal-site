export function createFactoryContainer(instanceContainer, context) {
    const factories = [];

    function register(componentFactory) {
        factories.push(componentFactory(context));
    }

    function mountWithin(root) {
        for (const factory of factories) {
            const instances = factory(root) || [];

            for (const instance of instances) {
                instanceContainer.add(instance);
            }
        }
    }

    return {
        register,
        mountWithin,
    };
}
