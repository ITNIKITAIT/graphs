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

const findStrongConnections = (сomponents, dirMatrix) => {
    const connections = {};

    for (const key in сomponents) {
        connections[key] = [];
        const verts = сomponents[key].map((el) => el.slice(1) - 1);
        for (const ver of verts) {
            for (let i = 0; i < dirMatrix.length; i++) {
                if (verts.includes(i)) continue;
                if (dirMatrix[ver][i]) {
                    const k = Object.keys(сomponents).find((k) =>
                        сomponents[k].includes(`V${i + 1}`)
                    );
                    if (!connections[key].includes(k)) {
                        connections[key].push(k);
                    }
                }
            }
        }
    }
    return connections;
};
export { findStrongComponents, findStrongConnections };
