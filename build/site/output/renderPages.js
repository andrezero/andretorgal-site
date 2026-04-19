import fs from 'fs-extra';
import path from 'node:path';

import { readJsonFile } from '../../shared/fs/readJsonFile.js';
import * as logger from '../../shared/logger.js';
import { getUrl } from '../shared/getUrl.js';
import { indexSiteMap } from '../sitemap/indexSiteMap.js';
import { createRendererEnv } from './nunjucks/createRendererEnv.js';
import { renderPage } from './renderPage.js';

export async function renderPages(buildConfig, localeConfig, siteConfig, siteMap, i18n) {
    const { paths: PATHS } = buildConfig;

    const siteIndex = indexSiteMap(siteMap);

    const filePath = path.join(PATHS.src, 'data/languages.json');

    const data = await readJsonFile(filePath);
    const sorted = data.sort((a, b) => a.level - b.level);

    for (const page of siteMap) {
        const { id, lang, slug, title, layout } = page;

        const renderer = createRendererEnv(PATHS.templates, siteIndex, i18n, localeConfig, lang);
        const context = {
            locale: localeConfig,
            site: {
                meta: siteConfig,
                map: siteMap,
                index: siteIndex,
            },
            page: {
                ...page,
                title: title || buildConfig.title,
            },
            data: {
                languages: data,
            },
            getUrl,
        };

        const pageHtml = await renderPage(context, PATHS.templates, layout);
        const docHtml = renderer.render('index.njk', { ...context, html: pageHtml });

        const outputPath = path.join(PATHS.dist, lang, id === '/' ? '' : slug, 'index.html');
        await fs.ensureDir(path.dirname(outputPath));
        await fs.writeFile(outputPath, docHtml, 'utf-8');

        logger.info(`   📄 Rendered: ${page.url}`);
    }

    logger.progress(`Rendered ${siteMap.length} pages to '${PATHS.dist}'.`);
}
