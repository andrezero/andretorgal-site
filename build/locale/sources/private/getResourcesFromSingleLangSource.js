import * as logger from '../../../shared/logger.js';
import { ensureObject, ensureString } from '../../../shared/primitives/validators.js';
import { flattenResources } from './flattenResources.js';

export function getResourcesFromSingleLangSource(source, languages) {
    const { key, resources, lang, sourceId } = source;

    try {
        ensureString(`key`, key);
        ensureObject(`resources`, resources);
    } catch (err) {
        logger.warn(`Invalida data in '${sourceId}'. ${err.message}`);
        return [];
    }

    if (!languages.includes(lang)) {
        logger.warn(`Ignoring unknown language '${lang}' in '${sourceId}'.`);
        return;
    }

    return [
        {
            lang,
            keys: flattenResources(key, resources),
            sourceId,
        },
    ];
}
