import type { Attribution, FigureResolvedProps, ImageProps } from '@integration/images';

function resolveAttribution(attribution?: string): Attribution | undefined {
    const match = attribution && attribution.match(/(https:\/\/[^\s]+)\s*$/);
    return match
        ? {
              text: attribution.replace(match[1] || '', ''),
              link: match[1],
          }
        : undefined;
}

function resolveExternalImageDimensions(dimensions?: string): {
    width: number | undefined;
    height: number | undefined;
} {
    const match = dimensions && dimensions.match(/(\d+)x(\d+)/);
    return match
        ? {
              width: parseInt(match[1] as string, 10),
              height: parseInt(match[2] as string, 10),
          }
        : { width: undefined, height: undefined };
}

function resolveTitle(title?: string): {
    title: string;
    attribution: Attribution | undefined;
    width: number | undefined;
    height: number | undefined;
} {
    const parts = title ? title.split('// ') : [''];
    const { width, height } = resolveExternalImageDimensions(parts[2]);
    return {
        title: parts[0]?.trim() || '',
        attribution: resolveAttribution(parts[1]),
        width,
        height,
    };
}

export function resolveFigureProps(props: ImageProps): FigureResolvedProps {
    const { src, alt = '', title: maybeTitleAttributionAndHeight } = props;

    const { title, attribution, width, height } = resolveTitle(maybeTitleAttributionAndHeight);
    return { src, alt, title, attribution, width, height };
}
