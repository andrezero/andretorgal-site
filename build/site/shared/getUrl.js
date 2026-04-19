export function getUrl(lang, slug) {
    if (!slug) {
        return `/${lang}/`;
    }
    return `/${lang}/${slug}/`;
}
