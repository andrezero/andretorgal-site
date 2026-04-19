export function validateLocaleData(data, sourceId) {
    if (!data || typeof data !== 'object') {
        logger.warn(`Locale data from '${sourceId}' is empty or not a valid object.`);
        return;
    }

    const { key, resources } = data;

    if (typeof key !== 'string') {
        logger.warn(`Locale data from '${sourceId}' is missing a string 'key' property.`);
        return;
    }

    if (!resources || typeof resources !== 'object' || Array.isArray(resources)) {
        logger.warn(`Locale data from '${sourceId}' is missing a 'resources' object.`);
        return;
    }

    return {
        sourceId,
        key,
        resources,
    };
}
