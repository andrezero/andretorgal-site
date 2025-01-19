// @index(['./*.astro','./!(private|functions)*/index.ts}'], f => `export { default as ${f.name.replace(/\/index$/, '')} } from '${f.path}.astro';`)
export { default as Github } from './Github.astro';
export { default as Imdb } from './Imdb.astro';
export { default as Spotify } from './Spotify.astro';
export { default as Website } from './Website.astro';
export { default as Wikipedia } from './Wikipedia.astro';
export { default as Youtube } from './Youtube.astro';
// @endindex

export * from './extractIcon';
