export function createIurlFilter(siteIndex, defaultLang, currentLang) {
    return (targetId, targetLang) => {
        let normalizedId = `${targetId}/`.replace(/\/\/$/, '/');

        const page = siteIndex[normalizedId];
        const lang = targetLang || currentLang;

        if (page) {
            if (page[lang]) {
                return page[lang].url;
            }
            if (page[defaultLang].url) {
                return page[defaultLang].url;
            }
        }
        return '#';
    };
}
