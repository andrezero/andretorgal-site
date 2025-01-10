// @index(['./*.astro','./!(private|functions)*/index.ts}'], f => `export { default as ${f.name.replace(/\/index$/, '')} } from '${f.path}.astro';`)
export { default as Body } from './Body.astro';
export { default as Document } from './Document.astro';
export { default as Head } from './Head.astro';
export { default as Layout } from './Layout.astro';
