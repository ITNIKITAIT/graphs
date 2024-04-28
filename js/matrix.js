import { mulmr } from './random.js';
import { N } from './consts.js';
import { drawConnection, vertices } from './draw.js';

const createClearMatrix = (n) => {
    let matrix = [];
    for (let i = 0; i < n; i++) {
        matrix.push([]);
        for (let j = 0; j < n; j++) {
            matrix[i][j] = 0;
        }
    }
    return matrix;
};

const generateDirMatrix = (isW = false) => {
    const matrix = [];
    for (let i = 0; i < N; i++) {
        matrix.push([]);
        for (let j = 0; j < N; j++) {
            matrix[i].push(mulmr(isW));
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

const multiplyMatrix = (matrix1, matrix2) => {
    const length = matrix1.length;
    const squareMatrix = [];
    for (let i = 0; i < length; i++) {
        squareMatrix.push([]);
        for (let j = 0; j < length; j++) {
            let res = 0;
            for (let k = 0; k < length; k++) {
                res += matrix1[i][k] * matrix2[k][j];
            }
            squareMatrix[i].push(res);
        }
    }
    return squareMatrix;
};

const matrixInPower = (matrix, power) => {
    let newMatrix = matrix;
    for (let i = 1; i < power; i++) {
        newMatrix = multiplyMatrix(newMatrix, matrix);
    }
    return newMatrix;
};

const matrixToBoolean = (matrix) => {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            if (matrix[i][j]) matrix[i][j] = 1;
        }
    }
    return matrix;
};

const addMatrix = (matrix1, matrix2) => {
    const result = structuredClone(matrix1);
    for (let i = 0; i < matrix2.length; i++) {
        for (let j = 0; j < matrix2.length; j++) {
            result[i][j] += matrix2[i][j];
        }
    }
    return result;
};

const multiplyMatrixIndivid = (matrix1, matrix2) => {
    const result = structuredClone(matrix1);
    for (let i = 0; i < matrix2.length; i++) {
        for (let j = 0; j < matrix2.length; j++) {
            result[i][j] *= matrix2[i][j];
        }
    }
    return result;
};

const reachabilityMatrix = (matrix) => {
    let result = structuredClone(matrix);
    for (let i = 2; i < matrix.length; i++) {
        const matrixUpper = matrixInPower(matrix, i);
        result = addMatrix(matrixUpper, result);
    }
    for (let d = 0; d < matrix.length; d++) {
        result[d][d]++;
    }
    return matrixToBoolean(result);
};

const matrixT = (matrix) => {
    const transposedMatrix = structuredClone(matrix);
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            transposedMatrix[j][i] = matrix[i][j];
        }
    }
    return transposedMatrix;
};

const fillMatrix = (list, matrix) => {
    list.innerHTML = '';
    const ROW_WIDTH = 20;
    const GAP = 5;
    const PADDING = 10;
    list.style.width = `${N * ROW_WIDTH + (N - 1) * GAP + PADDING * 2 + 2}px`;
    for (let i = 0; i < matrix.length; i++) {
        matrix[i].forEach((el) => {
            list.insertAdjacentHTML('beforeend', `<li class="item">${el}</li>`);
        });
    }
};

const matrixW = (unDirMatrix) => {
    const matrixB = generateDirMatrix(true);
    const matrixC = matrixB.map((row, i) =>
        row.map((el, j) => Math.ceil(el * 100 * unDirMatrix[i][j]))
    );
    const matrixD = matrixC.map((row) => row.map((el) => (el > 0 ? 1 : 0)));
    const matrixH = matrixD.map((row, i) =>
        row.map((el, j) => (matrixD[i][j] !== matrixD[j][i] ? 1 : 0))
    );
    const matrixTr = matrixB.map((row, i) =>
        row.map((_, j) => (i < j ? 1 : 0))
    );
    const matrixW = createClearMatrix(unDirMatrix.length);
    for (let i = 0; i < matrixW.length; i++) {
        for (let j = 0; j < i; j++) {
            matrixW[i][j] = matrixW[j][i] =
                (matrixD[i][j] + matrixH[i][j] * matrixTr[i][j]) *
                matrixC[i][j];
        }
    }
    return matrixW;
};

const createListEdges = (matrixW) => {
    const edges = [];
    for (let i = 0; i < matrixW.length; i++) {
        for (let j = 0; j < i; j++) {
            if (matrixW[i][j])
                edges.push({
                    weight: matrixW[i][j],
                    firstVer: i,
                    secondVer: j,
                });
        }
    }
    return edges.sort((edge1, edge2) => edge1.weight - edge2.weight);
};

export {
    createClearMatrix,
    generateDirMatrix,
    getUndirMatrix,
    multiplyMatrixIndivid,
    reachabilityMatrix,
    matrixT,
    fillMatrix,
    matrixW,
    createListEdges,
    N,
};
