export const findUndirMatrixDegree = (matrix) => {
    console.log('The Degree of undir matrix:');
    const res = [];
    for (let i = 0; i < matrix.length; i++) {
        let counter = 0;
        for (let j = 0; j < matrix.length; j++) {
            if (matrix[i][j]) {
                if (i === j) counter++;
                counter++;
            }
        }
        console.log(`V${i + 1} = ${counter}`);
        res.push(counter);
    }
    return res;
};
export const findDirMatrixTotalDegree = (matrix) => {
    const [arr1, arr2] = Object.values(findMatrixDegrees(matrix));
    console.log('The Degree of dir matrix:');
    return arr1.map((_, i) => {
        console.log(`V${i + 1} = ${arr1[i] + arr2[i]}`);
        return arr1[i] + arr2[i];
    });
};

export const findMatrixDegrees = (matrix) => {
    console.log('The indegree and outdegree of dir matrix:');
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
    const res = degrees.every((el) => degrees[0] === el);
    if (res) console.log('Matrix is regular');
    else console.log('Matrix is not regular');
    return res;
};

export const findIsolatedVertices = (degrees) => {
    const res = [];
    degrees.forEach((el, i) => el === 0 && res.push(`V${i + 1}`));
    console.log(
        `The list of isolated vertices: ${
            res.length === 0 ? 'list is empty' : res
        }`
    );
    return res;
};
export const findHangingVertices = (degrees) => {
    const res = [];
    degrees.forEach((el, i) => el === 1 && res.push(`V${i + 1}`));
    console.log(
        `The list of hanging vertices: ${
            res.length === 0 ? 'list is empty' : res
        }`
    );
    return res;
};
