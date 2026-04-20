export function getViewportAnchor() {
    const elements = document.querySelectorAll('[data-scroll]');

    let best = null;
    let bestOffset = Infinity;

    for (const el of elements) {
        const rect = el.getBoundingClientRect();

        const isVisible = rect.bottom > 0 && rect.top < window.innerHeight;

        if (!isVisible) continue;

        const offset = Math.abs(rect.top);

        if (offset < bestOffset) {
            bestOffset = offset;
            best = el;
        }
    }

    return best;
}
