export const findUndirMatrixDegree = (matrix) => {
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
export const findDirMatrixTotalDegree = (matrix) => {
    const [arr1, arr2] = Object.values(findMatrixDegrees(matrix));
    return arr1.map((_, i) => arr1[i] + arr2[i]);
};

export const findMatrixDegrees = (matrix) => {
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

export const isRegularMatrix = (degrees) => {
    return degrees.every((el) => degrees[0] === el);
};

export const findIsolatedVertices = (degrees) => {
    const res = [];
    degrees.forEach((el, i) => el === 0 && res.push(`V${i + 1}`));
    return res;
};
export const findHangingVertices = (degrees) => {
    const res = [];
    degrees.forEach((el, i) => el === 1 && res.push(`V${i + 1}`));
    return res;
};
