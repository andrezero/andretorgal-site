import { dirname, resolve } from 'path';

import { IS_RELATIVE_LOCAL_IMAGE, IS_REMOTE_IMAGE } from './constants';

export function getPublicPath(baseDir: string, mdxFile: string, url: string): string {
    if (IS_RELATIVE_LOCAL_IMAGE.test(url)) {
        const filename = resolve(dirname(mdxFile), url);
        return filename.replace(baseDir, '');
    } else if (IS_REMOTE_IMAGE.test(url)) {
        return url;
    } else {
        throw new Error(
            `Image "${url}" is neither relative or remote. If loading a local image make sure the path starts with "./" or "../"`,
        );
    }
}
