import { visit } from 'unist-util-visit';

import * as logger from '../../../../shared/logger.js';

export function rewriteLinksPlugin(siteIndex, entry, defaultLang) {
    return tree => {
        visit(tree, 'link', node => {
            if (/^(\w+:|\/\/|#)/.test(node.url)) {
                return;
            }

            let url = `${node.url}/`.replace(/\/\/$/, '/');

            const context = `Link to ${node.url} in ${entry.contentId}:`;
            const page = siteIndex[url];

            if (!page) {
                logger.warn(`${context} unknown target`);
            }

            if (page && page[entry.lang]) {
                node.url = page[entry.lang].url;
                return;
            }

            if (page[defaultLang]) {
                logger.warn(`${context} using default lang because '${entry.lang}' not available.`);
                node.url = page[defaultLang].url;
                return;
            }

            logger.warn(
                `${context} both current '${entry.lang}' and default '${defaultLang}' translations are not available.`,
            );
            return;
        });
    };
}
