import * as logger from '../../shared/logger.js';

export function mergeLocaleData(resourceEntries) {
    const resourceMap = new Map();

    for (const entry of resourceEntries) {
        const { lang, keys, sourceId } = entry;

        if (!resourceMap.has(lang)) {
            resourceMap.set(lang, {});
        }

        const target = resourceMap.get(lang);

        for (const [key, value] of Object.entries(keys)) {
            if (key in target) {
                logger.warn(`Igoring duplicate '${key}:${lang}' in '${sourceId}'.`);
            } else {
                target[key] = value;
            }
        }
    }

    return resourceMap;
}
