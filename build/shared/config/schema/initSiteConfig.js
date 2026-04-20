import { ensureObject, ensureString } from '../../primitives/validators.js';

export function initSiteConfig(data) {
    ensureObject(`site`, data);

    const url = ensureString(`site.url`, data.url);
    const title = ensureString(`site.title`, data.title);
    const description = ensureString(`site.description`, data.description);
    const email = ensureString(`site.email`, data.email);

    console.log(email);

    return {
        url,
        title,
        description,
        email,
    };
}
