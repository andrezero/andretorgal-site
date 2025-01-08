import type { Attribution, FigureResolvedProps, ImageProps } from '~/integration/images/types';

function resolveAttribution(attribution?: string): Attribution | undefined {
    const match = attribution && attribution.match(/(https:\/\/[^\s]+)\s*$/);
    return match
        ? {
              text: attribution.replace(match[1] || '', ''),
              link: match[1],
          }
        : undefined;
}

function resolveTitle(title?: string): { title: string; attribution: Attribution | undefined } {
    const parts = title ? title.split('// ') : [''];
    return {
        title: parts[0]?.trim() || '',
        attribution: resolveAttribution(parts[1]),
    };
}

export async function resolveFigureProps(props: ImageProps): Promise<FigureResolvedProps> {
    const { src, title: maybeTitleAndAttribution } = props;

    const { title, attribution } = resolveTitle(maybeTitleAndAttribution);
    return { src, title, attribution };
}
