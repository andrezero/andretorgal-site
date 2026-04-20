import { createTranslateFilter } from '../filters/createTranslateFilter.js';

export function createLocaleExtension(i18n, localeConfig, currentLang) {
    const translateText = createTranslateFilter(i18n, localeConfig, currentLang);

    function translate(args, translateText, unsafe) {
        const _context = args.shift();
        const locale = args.shift();
        const body = args.pop();
        const params = args.shift() || {};
        const key = typeof body === 'function' ? body() : '';

        if (unsafe) {
            translateText(key, locale, params);
        }

        return new SafeString(translateText(key, locale, params));
    }

    const api = {
        t: (...args) => translate(args, translateText),
        tUnsafe: (...args) => translate(args, translateText, true),
    };

    const tags = ['t', 'tUnsafe'];

    const parse = function (parser, nodes, lexer) {
        const tok = parser.nextToken();

        const args = parser.parseSignature(null, false);
        parser.advanceAfterBlockEnd(tok.value);

        const body = parser.parseUntilBlocks('endt');
        parser.advanceAfterBlockEnd();

        return new nodes.CallExtension(api, 't', args, [body]);
    };

    return {
        tags,
        parse,
    };
}
