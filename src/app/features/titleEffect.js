import { createBaseFeature } from '../../lib/createBaseFeature.js';
import { createQuery } from '../../lib/createQuery.js';

export default function createTitleEffectFeature(context) {
    const base = createBaseFeature(context);
    const { destroy: superDestroy, init: superInit } = base;

    const titles = createQuery(
        root => root.querySelectorAll('h1,h2'),
        el => {
            el.style.opacity = '0.9';
        },
        el => {
            el.style.opacity = '';
        },
    );

    function init(root) {
        superInit();
        titles.refresh(root);
    }

    function destroy() {
        titles.destroy();
        superDestroy();
    }

    return {
        ...base,
        init,
        destroy,
    };
}
