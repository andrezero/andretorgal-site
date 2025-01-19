// @index(['./!(private|functions)*/index.ts'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './about';
export * from './blog';
export * from './likes';
export * from './meta';
export * from './tags';
