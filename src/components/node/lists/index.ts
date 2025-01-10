// @index(['./*.astro','./!(private|functions)*/index.ts}'], f => `export { default as ${f.name.replace(/\/index$/, '')} } from '${f.path}.astro';`)
export { default as NodeList } from './NodeList.astro';
export { default as TagList } from './TagList.astro';
