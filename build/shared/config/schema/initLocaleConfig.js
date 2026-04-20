import { makePath } from '../../primitives/makePath.js';
import {
    ensureArray,
    ensureArrayNotEmpty,
    ensureBoolean,
    ensureObject,
    ensureString,
} from '../../primitives/validators.js';

export const PATHS = {
    scan: 'src',
    output: 'locale',
};

export function initLocaleConfig(root, data) {
    ensureObject(`locale`, data);

    const languages = ensureArrayNotEmpty(`locale.languages`, data.languages);
    const defaultLang = ensureString(`locale.defaultLang`, data.defaultLang);

    const paths = ensureArray(`locale.scanPaths`, data.scanPaths, [PATHS.scan]);
    const scanPaths = paths.map((scanPath, index) =>
        makePath(root, `locale.scanPaths.${index}`, scanPath),
    );
    const outputDir = makePath(root, `locale.outputDir`, data.outputDir);

    const watch = ensureObject(`locale.watch`, data.watch, {});
    const ignore = ensureArray(`locale.watch.ignore`, watch.ignore, []);
    ignore.forEach((value, index) => ensureString(`locale.watch.ignore.${index}`, value));

    const debug = ensureBoolean(`locale.debug`, data.debug, false);

    return {
        languages,
        defaultLang,
        scanPaths,
        outputDir,
        watch,
        debug,
    };
}
