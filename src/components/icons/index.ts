// @index(['./*.astro','./!(private|functions)*/index.ts}'], f => `export { default as ${f.name.replace(/\/index$/, '')} } from '${f.path}.astro';`)
export { default as ArrowUp } from './ArrowUp.astro';
export { default as ChevronLeft } from './ChevronLeft.astro';
export { default as ChevronRight } from './ChevronRight.astro';
export { default as External } from './External.astro';
