export function createAppContext(rootContext, router) {
    const { state, bus } = rootContext;

    return {
        state,
        bus,
        router,
    };
}
