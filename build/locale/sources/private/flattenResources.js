export function flattenResources(keyPrefix, resources) {
    const flattened = {};

    const recurse = (obj, currentKey) => {
        for (const [k, v] of Object.entries(obj)) {
            const newKey = `${currentKey}.${k}`;

            if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
                recurse(v, newKey);
            } else {
                flattened[newKey] = v;
            }
        }
    };

    recurse(resources, keyPrefix);
    return flattened;
}
