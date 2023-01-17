import type { Attribution, Image, ImageParams, ImageProps, ImageResolvedProps } from './types';

const parseParams = (str: string): ImageParams => {
    return str
        .split('&')
        .map(p => p.split('='))
        .reduce((acc, [k, v]) => {
            const key = k || '';
            // eslint-disable-next-line security/detect-object-injection
            acc[key] = v;
            return acc;
        }, {} as ImageParams);
};

const resolveImageProp = (props: ImageProps): Image => {
    if (typeof props.src === 'string') {
        return { ...props, src: props.src };
    }
    const { width = 0, height = 0 } = props;
    return { width, height, ...props.src };
};

const resolveAttribution = (attribution?: string): Attribution => {
    const match = attribution && attribution.match(/(https:\/\/[^\s]+)\s*$/);
    return (
        match && {
            text: attribution.replace(match[1], ''),
            link: match[1],
        }
    );
};

const resolveTitle = (title: string): { title: string; attribution?: Attribution } => {
    const parts = title ? title.split('// ') : [''];
    return {
        title: parts[0].trim(),
        attribution: resolveAttribution(parts[1]),
    };
};

export const resolveImageProps = (props: ImageProps): ImageResolvedProps => {
    let { width, height, src } = resolveImageProp(props);
    const { alt, title: maybeTitleAndAttribution } = props;

    const match = (!width || !height) && alt?.match(/^\/([a-z0-9=&]+)\//);
    const str = match && match[1];
    const params = str ? parseParams(str) : {};

    if (!width) width = params.w ? Number(params.w) : 0;
    if (!height) height = params.h ? Number(params.h) : 0;

    if (!width || !height) {
        throw new Error('Please provide /w=___&h=___/ for this remote image: ' + src);
    }

    const { title, attribution } = resolveTitle(maybeTitleAndAttribution);

    return { src, width, height, title, alt: alt || '', attribution };
};
