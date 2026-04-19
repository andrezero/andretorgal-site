export function createFeatureContainer(context) {
    const features = [];

    function register(featureFactory) {
        const feature = featureFactory(context);
        features.push(feature);
    }

    function init(root) {
        for (const feature of features) {
            feature.init(root);
        }
    }

    function destroy() {
        for (const feature of features) {
            feature.destroy();
        }
    }

    return {
        register,
        init,
        destroy,
    };
}
