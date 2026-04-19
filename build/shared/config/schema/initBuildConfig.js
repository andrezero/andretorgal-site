import { makePath } from '../../primitives/makePath.js';
import { ensureArray, ensureObject, ensureString } from '../../primitives/validators.js';

const PATHS = {
    src: 'src',
    dist: 'dist',
    assets: 'dist/assets',
    public: 'public',
    content: 'src/content',
    styles: 'src/app/styles',
    templates: 'src/templates',
};

export function initBuildConfig(root, data) {
    ensureObject(`build`, data);

    const paths = ensureObject(`build.paths`, data.paths, {});
    const buildPaths = {
        src: makePath(root, `build.paths.src`, paths.src, PATHS.src),
        dist: makePath(root, `build.paths.dist`, paths.dist, PATHS.dist),
        assets: makePath(root, `build.paths.assets`, paths.assets, PATHS.assets),
        public: makePath(root, `build.paths.public`, paths.public, PATHS.public),
        content: makePath(root, `build.paths.content`, paths.content, PATHS.content),
        styles: makePath(root, `build.paths.styles`, paths.styles, PATHS.styles),
        templates: makePath(root, `build.paths.templates`, paths.templates, PATHS.templates),
    };

    const js = ensureObject(`build.js`, data.js, {});
    const entry = ensureString(`build.js.entry`, js.entry, 'index.js');

    const css = ensureObject(`build.css`, data.css, {});

    const tokens = ensureObject(`build.css.tokens`, css.tokens, {});
    const tokensSrc = ensureString(`build.css.tokens.src`, tokens.src);
    const tokensTarget = ensureString(`build.css.tokens.target`, tokens.target);

    const layers = ensureObject(`build.css.layers`, css.layers, {});
    const layersSrc = ensureString(`build.css.layers.src`, layers.src);

    const watch = ensureObject(`build.watch`, data.watch, {});
    const ignore = ensureArray(`build.watch.ignore`, watch.ignore, []);
    ignore.forEach((value, index) => ensureString(`build.watch.ignore.${index}`, value));

    return {
        paths: buildPaths,
        js: {
            entry,
        },
        css: {
            tokens: {
                src: tokensSrc,
                target: tokensTarget,
            },
            layers: {
                src: layersSrc,
            },
        },
        watch: {
            ignore,
        },
    };
}
