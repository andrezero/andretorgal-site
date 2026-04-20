import nunjucks from 'nunjucks';

import { createLocaleExtension } from './extensions/createLocaleExtension.js';
import { createIurlFilter } from './filters/createIurlFilter.js';
import { createJsonFilter } from './filters/createJsonFilter.js';
import { createPageNameFilter } from './filters/createPageNameFilter.js';
import { createTranslateFilter } from './filters/createTranslateFilter.js';

export function createRendererEnv(templateDir, siteIndex, i18n, localeConfig, currentLang) {
    const env = nunjucks.configure(templateDir, {
        autoescape: true,
        watch: false,
    });

    env.addExtension('locale-extension', createLocaleExtension(i18n, localeConfig, currentLang));

    const tFilter = createTranslateFilter(i18n, localeConfig, currentLang);
    env.addGlobal('t', tFilter);
    env.addFilter('t', tFilter);

    const tFilterUnsafe = createTranslateFilter(i18n, localeConfig, currentLang, false);
    env.addGlobal('tUnsafe', tFilterUnsafe);
    env.addFilter('tUnsafe', tFilterUnsafe);

    const iUrlFilter = createIurlFilter(siteIndex, localeConfig.defaultLang, currentLang);
    env.addGlobal('iurl', iUrlFilter);
    env.addFilter('iurl', iUrlFilter);

    const pageNameFilter = createPageNameFilter(siteIndex, localeConfig.defaultLang, currentLang);
    env.addGlobal('pagename', pageNameFilter);
    env.addFilter('pagename', pageNameFilter);

    env.addFilter('json', createJsonFilter());

    return env;
}
