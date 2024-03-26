import { graphs, drawArc } from './animation.js';

const SEED = 3118;
const N = 11;

Math.seedrandom(SEED);
const rand = () => {
    return Math.random() * 2;
};

const mulmr = (rand, k) => {
    return Math.floor(rand * k);
};

const generateDirMatrix = () => {
    const matrix = [];
    const numbers = Array.from(SEED.toString(), Number);
    const n3 = numbers[2];
    const n4 = numbers[3];
    const k = 1.0 - n3 * 0.02 - n4 * 0.005 - 0.25;
    for (let i = 0; i < N; i++) {
        matrix.push([]);
        for (let j = 0; j < N; j++) {
            matrix[i].push(mulmr(rand(), k));
        }
    }
    return matrix;
};

const getUndirMatrix = (matrix) => {
    const undirMatrix = structuredClone(matrix);
    for (let i = 0; i < undirMatrix.length; i++) {
        for (let j = 0; j < undirMatrix.length; j++) {
            if (undirMatrix[i][j] === 1) undirMatrix[j][i] = 1;
        }
    }
    return undirMatrix;
};

const printMatrix = (matrix) => {
    matrix.forEach((el) => {
        console.log(el.join('  '));
    });
};

const newMatrix = generateDirMatrix();
printMatrix(newMatrix);
console.log('next');
const unDirMatrix = getUndirMatrix(newMatrix);
printMatrix(unDirMatrix);

const connectGraphs = (matrix) => {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = i; j < matrix.length; j++) {
            if (matrix[i][j]) {
                drawArc(graphs[i], graphs[j]);
            }
        }
    }
};
connectGraphs(unDirMatrix);
