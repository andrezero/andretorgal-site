// @index// @index(['./*.ts', './!(private|parts|functions)*/index.ts'], f => `export * from '${f.path.replace(/\/index$/, '')}';`)
export * from './auto-imports';
export * from './autoAbstract';
export * from './autoImports';
export * from './common';
export * from './customComponents';
