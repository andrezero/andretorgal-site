let callbacks = [];

const handleOnReady = () => {
    callbacks.forEach(fn => fn.call());
    callbacks = [];
};

export function onReady(fn) {
    if (document.readyState === 'loading') {
        callbacks.push(fn);
    } else {
        fn.call();
    }
}

document.addEventListener('DOMContentLoaded', handleOnReady);
