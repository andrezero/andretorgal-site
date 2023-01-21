import { defaultProfile } from '../profiles';
import type { Attribution, FigureResolvedProps, ImageProps, ImageResolvedProps } from '../types';

import { getImageFacts } from './getImageFacts';
import { imageEndpoint } from './imageEndpoint';
import { imageFilename } from './imageFilename';

const resolveAttribution = (attribution?: string): Attribution | undefined => {
    const match = attribution && attribution.match(/(https:\/\/[^\s]+)\s*$/);
    return match
        ? {
              text: attribution.replace(match[1] || '', ''),
              link: match[1],
          }
        : undefined;
};

const resolveTitle = (title?: string): { title: string; attribution: Attribution | undefined } => {
    const parts = title ? title.split('// ') : [''];
    return {
        title: parts[0]?.trim() || '',
        attribution: resolveAttribution(parts[1]),
    };
};

export const resolveFigureProps = async (props: ImageProps): Promise<FigureResolvedProps> => {
    const { src, title: maybeTitleAndAttribution } = props;

    // TODO how to config base path?
    const { width, height, dominant } = await getImageFacts(`src/pages`, src);
    const { title, attribution } = resolveTitle(maybeTitleAndAttribution);
    return { src, width, height, dominant, title, attribution };
};

const makeSrcSet = (isStaticBuild: boolean, src: string, widths: number[], format: string) => {
    return widths
        .map(width => {
            const transform = { width, format };
            const name = isStaticBuild
                ? imageFilename(src, transform)
                : imageEndpoint(src, transform);
            return `${name} ${width}w`;
        })
        .join(', ');
};

export const resolveImageProps = (props: ImageProps): ImageResolvedProps => {
    const { src, alt, profile = defaultProfile } = props;

    const { widths, formats } = profile;
    const transform = { width: widths[0], format: formats[0] };

    const { addStaticImage, isStaticBuild } = globalThis.myIntegration;
    const imageSrc = isStaticBuild ? imageFilename(src, transform) : imageEndpoint(src, transform);

    addStaticImage(src, { width: widths[0], format: formats[0] });

    const sources = formats.map(format => {
        return {
            type: `image/${format}`,
            srcset: makeSrcSet(isStaticBuild, src, widths, format),
            sizes: profile.sizes,
        };
    });

    return {
        src: imageSrc,
        alt: alt || '',
        fit: 'cover',
        position: 'center',
        loading: 'lazy',
        decoding: 'async',
        sources,
    };
};
