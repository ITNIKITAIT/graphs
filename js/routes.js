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

export { findRoutes, fillRoutes };
