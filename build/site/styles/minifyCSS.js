import cssnano from 'cssnano';
import path from 'node:path';
import postcss from 'postcss/lib/postcss';

export async function minifyCSS(css, distDir) {
    const result = await postcss([cssnano({ preset: 'default' })]).process(css, {
        from: undefined,
        to: path.join(distDir, 'style.css'),
        map: false,
    });
    return result.css;
}
