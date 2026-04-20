export function indexSiteMap(siteMap) {
    const index = {};

    for (const page of siteMap) {
        const { id, lang } = page;

        if (!index[id]) {
            index[id] = {};
        }
        index[id][lang] = page;
    }

    return index;
}
