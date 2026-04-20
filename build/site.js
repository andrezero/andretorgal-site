import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import { initI18n } from './locale/runtime/initI18n.js';

import { readConfig } from './shared/config/readConfig.js';
import * as logger from './shared/logger.js';
import { scanContent } from './site/content/scanContent.js';
import { renderPages } from './site/output/renderPages.js';
import { parseContent } from './site/parser/parseContent.js';
import { buildSiteMap } from './site/sitemap/buildSiteMap.js';
import { renderSitemap } from './site/sitemap/renderSitemap.js';
import { buildStyles } from './site/styles/buildStyles.js';
import { buildTokens } from './site/styles/buildTokens.js';

async function main(config) {
    const { build: buildConfig, locale: localeConfig, site: siteConfig } = config;
    const { paths: PATHS } = buildConfig;

    await fs.emptyDir(PATHS.dist);
    await fs.ensureDir(PATHS.dist);

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

    logger.busy(`Building styles`);
    await buildTokens(buildConfig);
    await buildStyles(buildConfig);

    logger.busy('Rendering pages');
    await renderPages(buildConfig, localeConfig, siteConfig, siteMap, i18n);

    logger.busy('Rendering sitemap');
    await renderSitemap(buildConfig, siteMap);
}

try {
    logger.title('build/site');
    const config = await readConfig(fileURLToPath(import.meta.url));
    await main(config);
    logger.success('build/site complete');
} catch (err) {
    logger.fatal(`build/site failed`, err);
    process.exit(1);
}
