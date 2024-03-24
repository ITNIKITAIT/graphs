const SEED = 3118;
const N = 11;

const pseudoRandom = (seed) => {
    let value = seed;
    return function () {
        value = (value * 16807) % 2147483647;
        return value % 10 >= 5 ? 1 : 0;
    };
};
const generator = pseudoRandom(SEED);

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
            matrix[i].push(generator());
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
