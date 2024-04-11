import { SEED } from './consts.js';

Math.seedrandom(SEED);
const rand = () => {
    return Math.random() * 2;
};

export const mulmr = () => {
    const numbers = Array.from(SEED.toString(), Number);
    const n3 = numbers[2] || 0;
    const n4 = numbers[3] || 0;

    const k1 = 1.0 - n3 * 0.02 - n4 * 0.005 - 0.25;
    const k2 = 1.0 - n3 * 0.01 - n4 * 0.01 - 0.3;

    return Math.floor(rand() * k2);
};
