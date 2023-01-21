export const transform = async (image, { width, format, quality, fit, position }) => {
    image.rotate();
    image.resize({
        width: Math.round(width),
        fit,
        position,
    });

    image.toFormat(format, { quality });

    return image.jpeg();
};
