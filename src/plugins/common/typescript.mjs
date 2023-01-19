import { toLinux } from './path.mjs';

export function toImport({ file, name, isDefault }, alias) {
    return isDefault //
        ? `import ${alias} from '${toLinux(file)}';`
        : `import {${name} as ${alias}} from '${toLinux(file)}'`;
}
