import fs from 'fs-extra';

import { initI18n } from './locale/runtime/initI18n.js';
import * as logger from './shared/logger.js';
import { scanContent } from './site/content/scanContent.js';
import { renderPages } from './site/output/renderPages.js';
import { parseContent } from './site/parser/parseContent.js';
import { buildSiteMap } from './site/sitemap/buildSiteMap.js';
import { renderSitemap } from './site/sitemap/renderSitemap.js';
import { buildStyles } from './site/styles/buildStyles.js';
import { buildTokens } from './site/styles/buildTokens.js';

export async function buildSite(config, cssOnly = false) {
    const { build: buildConfig, locale: localeConfig, site: siteConfig } = config;
    const { paths: PATHS } = buildConfig;

    if (!cssOnly) {
        await fs.emptyDir(PATHS.dist);
    }
    await fs.ensureDir(PATHS.dist);

    if (!cssOnly) {
        logger.busy('Copying public assets');
        await fs.copy(PATHS.public, PATHS.dist);

        logger.busy('Scanning content');
        const files = await scanContent(PATHS.content);
        logger.info(`  - discovered ${files.length} items.`);

        logger.busy('Initialising i18n');
        const i18n = await initI18n(localeConfig);

        logger.busy('Parsing files');
        const pageDataMap = await parseContent(PATHS.content, files);
        logger.info(`  - discovered ${pageDataMap.size} pages.`);

        logger.busy(`Building sitemmap`);
        const siteMap = buildSiteMap(pageDataMap);

        logger.busy('Rendering pages');
        await renderPages(buildConfig, localeConfig, siteConfig, siteMap, i18n);

        logger.busy('Rendering sitemap');
        await renderSitemap(buildConfig, siteMap);
    }

    logger.busy(`Building styles`);
    await buildTokens(buildConfig);
    await buildStyles(buildConfig);
}
