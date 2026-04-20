import { ValidationError } from './ValidationError.js';

export function ensureDefined(key, value, defaultValue) {
    if (value !== undefined) {
        return value;
    }
    if (defaultValue !== undefined) {
        return defaultValue;
    }
    throw new ValidationError(`'${key}' is undefined.`);
}

export function ensureBoolean(key, value, defaultValue) {
    const v = ensureDefined(key, value, defaultValue);
    if (typeof v === 'boolean') {
        return v;
    }
    throw new ValidationError(`'${key}' is not a boolean.`);
}

export function ensureNumber(key, value, defaultValue) {
    const v = ensureDefined(key, value, defaultValue);
    if (typeof v === 'number') {
        return v;
    }
    throw new ValidationError(`'${key}' is not a boolean.`);
}

export function ensureString(key, value, defaultValue) {
    const v = ensureDefined(key, value, defaultValue);
    if (typeof v === 'string' && v.length) {
        return v;
    }
    throw new ValidationError(`'${key}' is not a non-empty string.`);
}

export function ensureObject(key, value, defaultValue) {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        return value;
    }
    if (defaultValue) {
        return defaultValue;
    }
    throw new ValidationError(`'${key}' is not an object.`);
}

export function ensureArray(key, value, defaultValue) {
    if (Array.isArray(value)) {
        return value;
    }
    if (defaultValue) {
        return defaultValue;
    }
    throw new ValidationError(`'${key}' is not an array.`);
}

export function ensureArrayNotEmpty(key, value, defaultValue) {
    const v = ensureArray(key, value, defaultValue);
    if (value.length) {
        return v;
    }
    throw new ValidationError(`'${key}' is an empty array.`);
}
