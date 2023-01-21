function fnv1a52(str: string): number {
    const len = str.length;
    let i = 0;
    let t0 = 0;
    let v0 = 8997;
    let t1 = 0;
    let v1 = 33826;
    let t2 = 0;
    let v2 = 40164;
    let t3 = 0;
    let v3 = 52210;
    while (i < len) {
        v0 ^= str.charCodeAt(i++);
        t0 = v0 * 435;
        t1 = v1 * 435;
        t2 = v2 * 435;
        t3 = v3 * 435;
        t2 += v0 << 8;
        t3 += v1 << 8;
        t1 += t0 >>> 16;
        v0 = t0 & 65535;
        t2 += t1 >>> 16;
        v1 = t1 & 65535;
        v3 = (t3 + (t2 >>> 16)) & 65535;
        v2 = t2 & 65535;
    }
    return (v3 & 15) * 281474976710656 + v2 * 4294967296 + v1 * 65536 + (v0 ^ (v3 >> 4));
}

const etag = (payload: string, weak = false): string => {
    const prefix = weak ? 'W/"' : '"';
    return prefix + fnv1a52(payload).toString(36) + payload.length.toString(36) + '"';
};

export { etag, fnv1a52 };
