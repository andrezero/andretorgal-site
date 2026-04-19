import fs from 'fs-extra';
import path from 'node:path';

import * as logger from '../../shared/logger.js';

export async function renderSitemap(buildConfig, siteMap) {
    const { paths: PATHS } = buildConfig;

    const sitemapPath = path.join(PATHS.dist, 'sitemap.json');
    const cleanMap = siteMap.map(p => ({
        lang: p.lang,
        slug: p.slug,
        url: p.url,
        title: p.title,
        sections: Array.from(Object.values(p.sections)).reduce((acc, item) => {
            acc[item.section] = {
                id: item.section,
                title: item.title,
            };
            return acc;
        }, {}),
        translations: p.translations,
    }));

    await fs.writeJSON(sitemapPath, cleanMap, { spaces: 2 });

    logger.progress(`Generated sitemap: '${sitemapPath}'`);
}
