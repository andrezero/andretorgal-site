import GithubSlugger from 'github-slugger';

const slugger = new GithubSlugger();

export function imageFilename(src, transform) {
    const { width, format } = transform;
    const isRemoteImage = /^(https?:)?\/\//.test(src);
    const extensionLessName = src.replace(/\.[a-z]+$/, '');
    const name = isRemoteImage ? `/remote/${slugger.slug(extensionLessName)}` : extensionLessName;
    return `${name}-${width}.${format}`;
}
