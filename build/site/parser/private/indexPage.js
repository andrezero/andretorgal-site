import * as logger from '../../../shared/logger.js';

export function indexPage(pageMap, entry) {
    const { filePath, id, lang } = entry;

    if (!pageMap.has(id)) {
        pageMap.set(id, new Map());
    }
    const pageLangs = pageMap.get(id);

    if (pageLangs.has(lang)) {
        const existingEntry = pageLangs.get(lang);
        logger.warn(`Duplicate page detected`);
        logger.info(`  - in file: '${filePath}'`);
        logger.info(`  - existing: '${existingEntry.filePath}' (id: '${id}', lang: '${lang}')`);
        return;
    }

    const isRoot = entry.id === '/';

    const contentId = `${entry.id} (${entry.lang})`;

    pageLangs.set(lang, { ...entry, contentId, isRoot });
}
