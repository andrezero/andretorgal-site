function translationsForEntry(translations, entry) {
    return translations
        .filter(t => t.lang !== entry.lang)
        .reduce((acc, item) => {
            acc[item.lang] = item;
            return acc;
        }, {});
}

export function buildSiteMap(pageDataMap) {
    const siteMap = [];

    for (const [id, langMap] of pageDataMap.entries()) {
        const translations = [];

        for (const [lang, entry] of langMap.entries()) {
            translations.push({
                lang: lang,
                slug: entry.slug,
                url: entry.url,
            });
        }

        translations.sort((a, b) => a.lang.localeCompare(b.lang));
        const level = translations[0].url.split('/').length - 2;

        for (const [, entry] of langMap.entries()) {
            const pageTranslations = translationsForEntry(translations, entry);
            const page = {
                ...entry,
                id: id,
                level,
                sections: entry.sections || {},
                translations: pageTranslations,
                hasTranslations: Object.values(pageTranslations).length > 1,
            };
            siteMap.push(page);
        }
    }

    return siteMap;
}
