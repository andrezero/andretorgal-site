import i18next from 'i18next';

import { loadLocaleResources } from './loadLocaleResources.js';

export async function initI18n(localeConfig) {
    const { defaultLang, outputDir } = localeConfig;
    const resources = await loadLocaleResources(outputDir);

    return i18next.init({
        debug: false,
        fallbackLng: defaultLang,
        resources,
    });
}
