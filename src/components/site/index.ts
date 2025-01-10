// @index(['./*.astro','./!(private|functions)*/index.ts}'], f => `export { default as ${f.name.replace(/\/index$/, '')} } from '${f.path}.astro';`)
export { default as SiteFooter } from './SiteFooter.astro';
export { default as SiteHeader } from './SiteHeader.astro';
export { default as SiteHeaderHeading } from './SiteHeaderHeading.astro';
export { default as SiteHeaderNav } from './SiteHeaderNav.astro';
export { default as SiteLogo } from './SiteLogo.astro';
export { default as SiteMain } from './SiteMain.astro';
// @endindex

// @index(['./!(private|functions)*/index.ts'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './logo';
export * from './parts';
export * from './sections';
