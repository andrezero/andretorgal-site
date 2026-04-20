import { createFactoryContainer } from '../lib/createFactoryContainer.js';
import { createFeatureContainer } from '../lib/createFeatureContainer.js';
import { createInstanceContainer } from '../lib/createInstanceContainer.js';
import { createRootContext } from '../lib/createRootContext.js';
import { createRouter } from '../lib/createRouter.js';

import button from './components/button.js';
import titleEffect from './features/titleEffect.js';

export function createApp() {
    const rootContext = createRootContext();
    const router = createRouter(rootContext);

    const appContext = createRootContext(rootContext);
    const instanceContainer = createInstanceContainer();
    const factoryContainer = createFactoryContainer(instanceContainer, appContext);
    const featureContainer = createFeatureContainer(appContext);

    factoryContainer.register(button);
    featureContainer.register(titleEffect);

    function mount(root) {
        factoryContainer.mountWithin(root);
        featureContainer.init(root);
    }

    router.onTransition(({ oldRoot, newRoot }) => {
        instanceContainer.destroyWithin(oldRoot);
        mount(newRoot);
    });

    return {
        mount: element => {
            mount(element);
            router.start();
        },
    };
}
