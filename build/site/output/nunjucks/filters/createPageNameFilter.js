export function createPageNameFilter(siteIndex, defaultLang, currentLang) {
    return (targetId, targetLang) => {
        let normalizedId = `${targetId}/`.replace(/\/\/$/, '/');

        const page = siteIndex[normalizedId];
        const lang = targetLang || currentLang;

        if (page) {
            if (page[lang]) {
                return page[lang].title;
            }
            if (page[defaultLang]) {
                return page[defaultLang].title;
            }
        }
    };
}
