import { createBaseComponent } from '../../lib/createBaseComponent.js';
import { createEvent } from '../../lib/createEvent.js';

function createButton(context, element) {
    const [onClick, emitClick] = createEvent();

    const base = createBaseComponent(context, element);

    const { destroy: superDestroy, init: superInit } = base;

    function init() {
        superInit();
        element.addEventListener('click', emitClick);
    }

    function destroy() {
        element.removeEventListener('click', emitClick);
        superDestroy();
    }

    return {
        ...base,
        init,
        onClick,
        destroy,
    };
}

function createButtons(context, element) {
    const nodes = element.querySelectorAll('[data-button]');
    return Array.from(nodes).map(node => createButton(context, node));
}

export default function createButtonFactory(context) {
    return function (element) {
        return createButtons(context, element);
    };
}
