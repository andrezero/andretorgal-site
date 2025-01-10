// @index(['./*.astro','./!(private|functions)*/index.ts}'], f => `export { default as ${f.name.replace(/\/index$/, '')} } from '${f.path}.astro';`)
export { default as LogoSvg } from './LogoSvg.astro';
export { default as MusicSvg } from './MusicSvg.astro';
export { default as NotFoundSvg } from './NotFoundSvg.astro';
export { default as StorySvg } from './StorySvg.astro';
export { default as WorkSvg } from './WorkSvg.astro';
