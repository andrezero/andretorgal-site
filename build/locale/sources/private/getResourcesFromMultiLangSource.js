import * as logger from '../../../shared/logger.js';
import { ensureObject, ensureString } from '../../../shared/primitives/validators.js';
import { flattenResources } from './flattenResources.js';

export function getResourcesFromMultiLangSource(source, languages) {
    const { key, resources, sourceId } = source;

    try {
        ensureString(`key`, key);
        ensureObject(`resources`, resources);
    } catch (err) {
        logger.warn(`Invalida data in '${sourceId}'. ${err.message}`);
        return [];
    }

    const entries = [];
    for (const [langCode, langResources] of Object.entries(resources)) {
        if (!languages.includes(langCode)) {
            logger.warn(`Ignoring unknown language '${langCode}' in '${sourceId}'.`);
            continue;
        }

        try {
            ensureObject(`resources.${langCode}`, langResources);
        } catch (err) {
            logger.warn(`Invalida data in '${sourceId}'. ${err.message}`);
            return [];
        }

        entries.push({
            lang: langCode,
            keys: flattenResources(key, langResources),
            sourceId,
        });
    }

    return entries;
}
