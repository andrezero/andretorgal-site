export function getFileMetaFromName(contentPath, filePath) {
    let relativePath = filePath.replace(contentPath, '').replace(/^[/\\]/, '');
    const nameWithLang = relativePath.replace(/\.(md|mdx)$/, '');

    const match = nameWithLang.match(/^(.+?)(?:_(.+))?\.([a-z]{2,3})$/i);
    if (!match) {
        throw new Error(
            `Invalid filename '${relativePath}'. Should be "slug.lang.md" or "slug_section.lang.md"`,
        );
    }

    const [, slugRaw, maybeSectionOrLang, maybeLang] = match;

    const cleanName = slugRaw.replace(/index$/, '');
    const id = `/${cleanName}/`.replace(/\/\//, '/');

    const lang = maybeLang ? maybeLang : maybeSectionOrLang;
    const section = maybeLang ? maybeSectionOrLang : undefined;

    if (!/^[a-z]{2,3}$/i.test(lang)) {
        throw new Error(`Invalid lang: '${lang}'.`);
    }

    return { id, lang, section };
}
