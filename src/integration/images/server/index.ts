import mime from 'mime';

import { DEFAULT_IMAGE_FORMAT, DEFAULT_IMAGE_SIZE } from '../profiles';
import { transformImage } from '../sharp';
import type { ImageFormat } from '../types';
import { etag } from '../utils/etag';
import { readImage } from '../utils/readImage';

type Params = {
    request: Request;
};

export async function get({ request }: Params): Promise<Response> {
    try {
        const url = new URL(request.url);
        const params = url.searchParams;

        const filename = params.get('src');
        const width = Number(params.get('width')) || DEFAULT_IMAGE_SIZE;
        const format = (params.get('format') as ImageFormat) || DEFAULT_IMAGE_FORMAT;

        if (!filename) {
            throw new Error('Missing filename');
        }

        // TODO how to config base path?
        const image = await readImage('src/pages', filename);
        const data = await transformImage(image, {
            width,
            format,
            quality: 50,
            fit: 'cover',
            position: 'center',
        });

        const buffer = await data.toBuffer();
        return new Response(buffer, {
            status: 200,
            headers: {
                'Content-Type': mime.getType(format) || '',
                'Cache-Control': 'public, max-age=31536000',
                ETag: etag(buffer.toString()),
                Date: new Date().toUTCString(),
            },
        });
    } catch (err) {
        console.error(err);
        return new Response(`Server Error: ${err}`, { status: 500 });
    }
}
