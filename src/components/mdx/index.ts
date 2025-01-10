// @index(['./*.astro','./!(private|functions)*/index.ts}'], f => `export { default as ${f.name.replace(/\/index$/, '')} } from '${f.path}.astro';`)
export { default as Abstract } from './Abstract.astro';
export { default as Audio } from './Audio.astro';
export { default as Blockquote } from './Blockquote.astro';
export { default as Figure } from './Figure.astro';
export { default as Iframe } from './Iframe.astro';
export { default as Image } from './Image.astro';
export { default as Note } from './Note.astro';
export { default as Todo } from './Todo.astro';
export { default as Year } from './Year.astro';
