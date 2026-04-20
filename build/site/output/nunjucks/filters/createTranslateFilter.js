function createParams(params, targetLang, escapeValue) {
    return {
        ...params,
        interpolation: { escapeValue: false },
        lng: targetLang,
    };
}

export function createTranslateFilter(i18n, localeConfig, currentLang, escapeValue = true) {
    return (keyId, params = {}) => {
        const targetLang = params.lng || currentLang;
        const translated = i18n(keyId, createParams(params, targetLang), escapeValue);
        if (translated) {
            return translated;
        }
        return i18n(keyId, createParams(params, localeConfig.defaultLang), escapeValue);
    };
}
