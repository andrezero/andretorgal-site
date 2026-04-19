import * as logger from '../../../shared/logger.js';

export function indexSection(sectionsMap, entry, sectionId) {
    const { filePath, id, lang } = entry;

    if (!sectionsMap.has(id)) {
        sectionsMap.set(id, new Map());
    }
    const pageLangs = sectionsMap.get(id);

    if (!pageLangs.has(lang)) {
        pageLangs.set(lang, new Map());
    }
    const langSections = pageLangs.get(lang);

    if (langSections.has(lang)) {
        const existingEntry = langSections.get(lang);
        logger.warn(`Duplicate section detected`);
        logger.info(`  - in file: '${filePath}'`);
        logger.info(
            `  - existing: '${existingEntry.filePath}' (id: '${id}', section: '${sectionId}', lang: '${lang}')`,
        );
        return;
    }

    const contentId = `${entry.id}#${sectionId} (${entry.lang})`;

    langSections.set(sectionId, { ...entry, section: sectionId, contentId });
}
