import nunjucks from 'nunjucks';
import { geLayoutFilename } from './geLayoutFilename.js';
import { mdToHtml } from './markdown/mdToHtml.js';

export async function renderPage(context, templatesDir, templateName = undefined) {
    const {
        site: { index: siteIndex, meta },
        page,
        locale,
    } = context;
    const defaultLang = locale.defaultLang;

    const { sections } = page;
    for (const section of Object.values(sections)) {
        const htmlContent = await mdToHtml(siteIndex, section, defaultLang);
        sections[section.section] = { ...section, html: htmlContent };
    }

    const htmlContent = await mdToHtml(siteIndex, page, defaultLang);
    const transformed = {
        ...page,
        sections,
        html: htmlContent,
    };

    if (templateName) {
        const templateFilename = await geLayoutFilename(templatesDir, templateName);
        const pageContext = {
            ...context,
            page: transformed,
        };
        return nunjucks.render(templateFilename, pageContext);
    }
    return context.page.html;
}
