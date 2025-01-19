import {
    Github,
    Imdb,
    Spotify,
    Website as WebsiteIcon,
    Wikipedia,
    Youtube,
} from '@components/icons';

import type { Link } from '~/nodes';

type IconComponent = (_props: Record<string, unknown>) => unknown;
type LinkIcon = [IconComponent, string, string];

const matches: Array<[RegExp, string]> = [
    [/:\/\/[^/]*wikipedia\.[a-z]+/, 'Wikipedia'],
    [/:\/\/[^/]*spotify\.com/, 'Spotify'],
    [/:\/\/[^/]*imdb\.com/, 'Imdb'],
    [/:\/\/[^/]*github\.com/, 'Github'],
    [/:\/\/[^/]*youtube\.com/, 'Youtube'],
];

export function extractIcon(link: Link): LinkIcon {
    const Website: LinkIcon = [WebsiteIcon, 'var(--t-palette-cyan-1)', 'var(--t-palette-cyan-2)'];
    const ICON_MAP: Record<string, LinkIcon> = {
        Wikipedia: [Wikipedia, '#000000', '#FFFFFF'],
        Spotify: [Spotify, '#1ED760', '#1ED760'],
        Imdb: [Imdb, '#F5C518', '#F5C518'],
        Github: [Github, '#181717', '#FFFFFF'],
        Youtube: [Youtube, '#FF0000', '#FF0000'],
        Website,
    };
    const type = link.icon || matches.find(([pattern]) => pattern.test(link.url))?.[1];
    if (type) {
        return ICON_MAP[type || ''] || Website;
    }
    return Website;
}

export function autoLabel(url: string): string {
    const type = matches.find(([pattern]) => pattern.test(url))?.[1];
    if (type) {
        return type;
    }
    try {
        const domain = new URL(url).hostname;
        return domain;
    } catch (e) {
        return 'Invalid URL';
    }
}
