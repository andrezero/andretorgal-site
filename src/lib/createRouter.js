import { createEvent } from './createEvent.js';
import { getViewportAnchor } from './getViewportAnchor.js';
import { restoreScroll } from './restoreScroll.js';

export function createRouter(context) {
    // history.scrollRestoration = 'manual';

    const [onTransition, triggerTransition] = createEvent();

    async function navigateTo(url) {
        // capture scroll BEFORE leaving page
        const anchorEl = getViewportAnchor();

        const scrollState = {
            anchor: anchorEl?.getAttribute('data-scroll') || null,
            y: window.scrollY,
        };

        history.replaceState({ scroll: scrollState }, '');
        const response = await fetch(url);
        const html = await response.text();

        const nextDocument = new DOMParser().parseFromString(html, 'text/html');

        const oldRoot = document.querySelector('#site-layout');
        const newRoot = nextDocument.querySelector('#site-layout');

        if (!oldRoot || !newRoot) {
            window.location.href = url;
            return;
        }

        document.title = nextDocument.title;

        const swap = () => {
            oldRoot.replaceWith(newRoot);
        };

        if (!document.startViewTransition) {
            swap();
        } else {
            await document.startViewTransition(swap).finished;
        }

        triggerTransition({
            url,
            oldRoot,
            newRoot,
        });
    }

    async function navigate(url) {
        navigateTo(url);
        history.pushState({}, '', url);
    }

    function handleClick(event) {
        const link = event.target.closest('a');

        if (!link) return;
        if (link.target) return;
        if (event.metaKey || event.ctrlKey || event.shiftKey) return;

        const url = new URL(link.href, window.location.href);

        if (url.origin !== window.location.origin) return;
        if (!url.pathname.endsWith('/')) return;

        event.preventDefault();

        if (url.href === window.location.href) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        navigate(url.href);
        window.scrollTo({ top: 0, behavior: 'instant' });
    }

    function handlePopState() {
        const { anchor, y } = history.state?.scroll || {};
        navigateTo(window.location.href);
        restoreScroll(anchor, y);
    }

    function start() {
        document.addEventListener('click', handleClick);
        window.addEventListener('popstate', handlePopState);
    }

    return {
        start,
        navigate,
        onTransition,
    };
}
