import fs from 'fs-extra';
import matter from 'gray-matter';

import * as logger from '../../shared/logger.js';
import { getUrl } from '../shared/getUrl.js';
import { attachSections } from './private/attachSections.js';
import { getFileMetaFromName } from './private/getFileMetaFromName.js';
import { indexPage } from './private/indexPage.js';
import { indexSection } from './private/indexSection.js';

export async function parseContent(contentPath, files) {
    const pageMap = new Map();
    const sectionsMap = new Map();

    for (const filePath of files) {
        const raw = await fs.readFile(filePath, 'utf-8');
        const { data, content } = matter(raw);
        const { title, layout, section: sectionIdOverride } = data;

        const {
            id,
            lang: fileLang,
            section: fileSectionId,
        } = getFileMetaFromName(contentPath, filePath);
        const lang = fileLang || data.lang;

        const slug = (data.slug || id.substring(1)).replace(/\/+$/, '');
        const sectionId = fileSectionId || sectionIdOverride;

        if (!lang) {
            logger.warn(`Skipping '${filePath}' because missing 'lang'.`);
            continue;
        }

        const entry = {
            filePath,
            id,
            lang,
            slug,
            title,
            layout,
            url: getUrl(lang, slug),
            raw: content,
            frontmatter: { ...data },
        };

        if (fileSectionId) {
            indexSection(sectionsMap, entry, sectionId);
        } else {
            indexPage(pageMap, entry);
        }
    }

    attachSections(pageMap, sectionsMap);

    return pageMap;
}
