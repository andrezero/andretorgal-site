import * as logger from '../../../shared/logger.js';

// sectionsMap = Map<pageId, Map<lang, Map<sectionId, sectionEntry>>>
// pageDataMap = Map<pageId, Map<lang, pageEntry>>
export function attachSections(pageDataMap, sectionsMap) {
    for (const [id, langMap] of sectionsMap.entries()) {
        if (!pageDataMap.has(id)) {
            logger.warn(`Orphan section(s) found`);
            const paths = Array.from(langMap.values()).reduce((acc, sections) => {
                return [...acc, ...Array.from(sections.values()).map(s => s.filePath)];
            }, []);
            logger.info(`  - in file(s): '${paths.join(', ')}'`);
            logger.info(`  - Unknown page: '${id}'`);
            continue;
        }
        const pageLangs = pageDataMap.get(id);

        for (const [lang, sections] of langMap.entries()) {
            if (!pageLangs.has(lang)) {
                logger.warn(`Orphan section(s) found`);
                const paths = Array.from(sections.values()).map(s => s.filePath);
                logger.info(`  - in file(s): '${paths.join(', ')}'`);
                logger.info(`  - Unknown lang '${lang}' for page '${id}'`);
                continue;
            }
            const page = pageLangs.get(lang);

            const sorted = Array.from(sections.values()).sort((a, b) => {
                const orderA = a.frontmatter?.order || 0;
                const orderB = b.frontmatter?.order || 0;

                if (orderA !== orderB) {
                    return orderA - orderB;
                }
                return a.section.localeCompare(b.section);
            });

            if (!page.sections) {
                page.sections = {};
            }
            for (const [index, section] of sorted.entries()) {
                page.sections[section.section] = { ...section, order: index };
            }
        }
    }
}
