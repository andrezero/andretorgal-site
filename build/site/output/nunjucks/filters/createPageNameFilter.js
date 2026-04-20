export function createPageNameFilter(siteIndex, defaultLang, currentLang) {
    return (targetId, targetLang) => {
        let normalizedId = `${targetId}/`.replace(/\/\/$/, '/');

        const page = siteIndex[normalizedId];
        const lang = targetLang || currentLang;

        if (page) {
            if (page[lang]) {
                console.log(targetId, targetLang, page[lang].title);
                console.log('page[lang].title', page[lang].title);
                return page[lang].title;
            }
            if (page[defaultLang]) {
                console.log('page[defaultLang].title', page[defaultLang].title);
                return page[defaultLang].title;
            }
        }
    };
}
