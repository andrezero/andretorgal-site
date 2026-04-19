export function restoreScroll(y, anchor) {
    if (anchor) {
        const el = document.querySelector(`[data-scroll="${anchor}"]`);
        if (el) {
            el.scrollIntoView({ block: 'start' });
            return;
        }
    }
    window.scrollTo({ top: y ?? 0, behavior: 'smooth' });
}
