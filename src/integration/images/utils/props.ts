import { DEAFULT_IMAGE_SIZE, DEFAULT_IMAGE_FORMAT, defaultProfile } from '../profiles';
import type {
    Attribution,
    FigureResolvedProps,
    ImageFormat,
    ImageProps,
    ImageResolvedProps,
    ImageTransform,
} from '../types';

import { getImageEndpoint } from './getImageEndpoint';
import { getImageFacts } from './getImageFacts';
import { getImageFilename } from './getImageFilename';

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace globalThis {
    // eslint-disable-next-line no-var
    var myIntegration: {
        addStaticImage: (src: string, transform: ImageTransform) => undefined;
        isStaticBuild: boolean;
    };
}

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

function makeSrcSet(isStaticBuild: boolean, src: string, widths: number[], format: ImageFormat) {
    return widths
        .map(width => {
            const transform = { width, format };
            const name = isStaticBuild
                ? getImageFilename(src, transform)
                : getImageEndpoint(src, transform);
            return `${name} ${width}w`;
        })
        .join(', ');
}

export async function resolveFigureProps(props: ImageProps): Promise<FigureResolvedProps> {
    const { src, title: maybeTitleAndAttribution } = props;

    // TODO how to config base path?
    const { width, height, dominant } = await getImageFacts(`src/pages`, src);
    const { title, attribution } = resolveTitle(maybeTitleAndAttribution);
    return { src, width, height, dominant, title, attribution };
}

export function resolveImageProps(props: ImageProps): ImageResolvedProps {
    const { src, alt, profile = defaultProfile } = props;

    const { widths, formats } = profile;
    const transform: ImageTransform = {
        width: widths[0] || DEAFULT_IMAGE_SIZE,
        format: formats[0] || DEFAULT_IMAGE_FORMAT,
    };

    const integration = globalThis.myIntegration;
    const { addStaticImage, isStaticBuild } = integration;
    const imageSrc = isStaticBuild
        ? getImageFilename(src, transform)
        : getImageEndpoint(src, transform);

    const sources = formats.map(format => {
        widths.forEach(width => addStaticImage(src, { width, format }));
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
}
