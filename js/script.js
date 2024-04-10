import { mulmr } from './random.js';
import { vertices, drawConnection, resetCanvas, drawArc } from './graph.js';

const N = 11;

const generateDirMatrix = () => {
    const matrix = [];
    for (let i = 0; i < N; i++) {
        matrix.push([]);
        for (let j = 0; j < N; j++) {
            matrix[i].push(mulmr());
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

const connectUnDirMatrix = (matrix) => {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = i; j < matrix.length; j++) {
            if (matrix[i][j]) {
                drawConnection(vertices[i], vertices[j]);
            }
        }
    }
};

const connectDirMatrix = (matrix) => {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            if (matrix[i][j]) {
                if (matrix[j][i] && i > j)
                    drawArc(vertices[i], vertices[j], true);
                else drawConnection(vertices[i], vertices[j], true);
            }
        }
    }
};

function fillMatrix(list, matrix) {
    list.innerHTML = '';
    const ROW_WIDTH = 20;
    const GAP = 5;
    const PADDING = 10;
    list.style.maxWidth = `${
        N * ROW_WIDTH + (N - 1) * GAP + PADDING * 2 + 2
    }px`;
    for (let i = 0; i < matrix.length; i++) {
        matrix[i].forEach((el) => {
            list.insertAdjacentHTML(
                'beforeend',
                `<li id="${i}" class="item">${el}</li>`
            );
        });
    }
}

const dirMatrix = generateDirMatrix();
const unDirMatrix = getUndirMatrix(dirMatrix);

// Buttons and lists

const list1 = document.querySelector('.dirmatrix');
const list2 = document.querySelector('.undirmatrix');
fillMatrix(list1, dirMatrix);
fillMatrix(list2, unDirMatrix);

const btnDirMatrix = document.querySelector('.btn-dirmatrix');
const btnUnDirMatrix = document.querySelector('.btn-undirmatrix');

btnDirMatrix.addEventListener('click', () => {
    resetCanvas();
    connectDirMatrix(dirMatrix);
});
btnUnDirMatrix.addEventListener('click', () => {
    resetCanvas();
    connectUnDirMatrix(unDirMatrix);
});

// vertices.forEach((el) => el.drawVertex());

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

const findRoutes = (matrix, length) => {
    let arrOfRoutes = [];
    const dfs = (currentRow, n, path) => {
        if (n === length) {
            arrOfRoutes.push([...path, currentRow + 1]);
            return;
        }
        for (let next = 0; next < matrix.length; next++) {
            if (matrix[currentRow][next]) {
                dfs(next, n + 1, [...path, currentRow + 1]);
            }
        }
    };
    for (let i = 0; i < matrix.length; i++) {
        dfs(i, 0, []);
    }
    return arrOfRoutes;
};

const mat = [
    [0, 1, 0, 1, 0],
    [0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0],
    [0, 0, 1, 0, 1],
    [0, 1, 0, 0, 0],
];

const AllRoutes2 = findRoutes(dirMatrix, 2);
const AllRoutes3 = findRoutes(dirMatrix, 3);

const tableRoute2 = document.getElementById('table-route-ln2');
const tableRoute3 = document.getElementById('table-route-ln3');

const fillRoutes = (arr, table) => {
    arr.forEach((route) => {
        const newRow = table.insertRow(-1);
        const startRoute = newRow.insertCell(0);
        startRoute.innerHTML = 'V' + route[0];
        const endRoute = newRow.insertCell(1);
        endRoute.innerHTML = 'V' + route.at(-1);
        const fulltRoute = newRow.insertCell(2);
        fulltRoute.innerHTML = `(${route.map((el) => 'V' + el).join(', ')})`;
    });
};

fillRoutes(AllRoutes2, tableRoute2);
fillRoutes(AllRoutes3, tableRoute3);

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

const AdjacencyMatrix = (matrix) => {
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

const AdjacMatrix = AdjacencyMatrix(dirMatrix);

const matrixT = (matrix) => {
    const transposedMatrix = structuredClone(matrix);
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            transposedMatrix[j][i] = matrix[i][j];
        }
    }
    return transposedMatrix;
};

const strongConnectMatrix = multiplyMatrixIndivid(
    AdjacMatrix,
    matrixT(AdjacMatrix)
);

const findStrongComponents = (matrix) => {
    const obj = {};
    for (let i = 0; i < matrix.length; i++) {
        const value = matrix[i].toString();
        if (obj[value]) obj[value].push(`V${i + 1}`);
        else obj[value] = [`V${i + 1}`];
    }

    const components = {};
    let i = 1;
    for (const key in obj) {
        components['K' + i] = obj[key];
        i++;
    }
    return components;
};
console.log(findStrongComponents(strongConnectMatrix));

//2

const findUndirMatrixDegree = (matrix) => {
    const res = [];
    for (let i = 0; i < matrix.length; i++) {
        let counter = 0;
        for (let j = 0; j < matrix.length; j++) {
            if (matrix[i][j]) {
                if (i === j) counter++;
                counter++;
            }
        }
        console.log(`for V${i + 1} = ${counter}`);
        res.push(counter);
    }
    return res;
};
const findDirMatrixTotalDegree = (matrix) => {
    const [arr1, arr2] = Object.values(findMatrixDegrees(matrix));
    return arr1.map((_, i) => arr1[i] + arr2[i]);
};

const findMatrixDegrees = (matrix) => {
    const res = {
        inDegree: [],
        outDegree: [],
    };
    for (let i = 0; i < matrix.length; i++) {
        let counterIn = 0;
        let counterOut = 0;
        for (let j = 0; j < matrix.length; j++) {
            if (matrix[i][j]) counterOut++;
            if (matrix[j][i]) counterIn++;
        }
        console.log(`for V${i + 1} indegree = ${counterIn}`);
        console.log(`for V${i + 1} outdegree = ${counterOut}`);
        res.inDegree.push(counterIn);
        res.outDegree.push(counterOut);
    }
    return res;
};

const isRegularMatrix = (degrees) => {
    return degrees.every((el) => degrees[0] === el);
};

const findIsolatedVertices = (degrees) => {
    const res = [];
    degrees.forEach((el, i) => el === 0 && res.push(`V${i + 1}`));
    return res;
};
const findHangingVertices = (degrees) => {
    const res = [];
    degrees.forEach((el, i) => el === 1 && res.push(`V${i + 1}`));
    return res;
};
const degreesMat = findDirMatrixTotalDegree(mat);
console.log(degreesMat);
findUndirMatrixDegree(unDirMatrix);
findMatrixDegrees(mat);
console.log(isRegularMatrix(mat));
console.log(findIsolatedVertices(degreesMat));
console.log(findHangingVertices(degreesMat));
