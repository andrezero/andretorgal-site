import { getImageFacts } from '../../../integration/images/getImageFacts.mjs';
import { imageEndpoint } from '../../../integration/images/imageEndpoint.mjs';
import { imageFilename } from '../../../integration/images/imageFilename.mjs';

import { defaultProfile } from './profiles';
import type { Attribution, FigureResolvedProps, ImageProps, ImageResolvedProps } from './types';

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

export const resolveImageProps = (props: ImageProps): ImageResolvedProps => {
    const { src, alt, profile = defaultProfile } = props;

    const { widths, formats } = profile;
    const transform = { width: widths[0], format: formats[0] };

    const { addStaticImage, isStaticBuild } = globalThis.myIntegration;
    const imageSrc = isStaticBuild ? imageFilename(src, transform) : imageEndpoint(src, transform);

    addStaticImage(src, { width: widths[0], format: formats[0] });
    return { src: imageSrc, alt: alt || '' };
};
