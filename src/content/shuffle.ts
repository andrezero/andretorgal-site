import type { BaseNode } from './types';

function* unpredictableButBiased<T>(array: T[], len: number): Generator<T> {
    const remainingArray = [...array];

    while (remainingArray.length > 0 && len > 0) {
        const randomFactor = Math.random();
        const index = Math.floor(remainingArray.length * Math.abs(Math.pow(randomFactor, 2)));
        yield remainingArray.splice(index, 1)[0] as T;
        len--;
    }
}

export function shuffleEverything(nodes: BaseNode[]): BaseNode[] {
    const pool = [...nodes];

    const shuffled = [];
    for (const item of unpredictableButBiased(pool, 100)) {
        shuffled.push(item);
    }

    return shuffled;
}
