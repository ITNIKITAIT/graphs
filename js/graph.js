const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const RADIUS = 30;
const N = 11;

ctx.translate(canvas.width / 2, canvas.height / 2);
ctx.globalCompositeOperation = 'destination-over';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.font = '22px serif';

class Vertex {
    constructor(x, y, r, number) {
        (this.x = x), (this.y = y);
        this.r = r;
        this.number = number;
    }
    drawVertex() {
        ctx.beginPath();
        ctx.fillStyle = '#ffffff';
        ctx.fillText(this.number, this.x, this.y);
        ctx.fillStyle = 'black';
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
    }
}

const fillVertexes = () => {
    const arrayOfVertex = [];
    const margin = 100;
    let interval = (canvas.width - margin * 2) / 3;
    let curY = -(canvas.height / 3);
    const startX = -(canvas.width / 2) + margin;
    let curX = startX;
    for (let i = 1; i <= N - 1; i++) {
        if (i === 5) {
            arrayOfVertex.push(new Vertex(-startX, 0, RADIUS, i));
            curY = -curY;
            interval *= -1;
            curX = -startX;
            continue;
        }
        if (i === 10) {
            arrayOfVertex.push(new Vertex(startX, 0, RADIUS, i));
            break;
        }
        arrayOfVertex.push(new Vertex(curX, curY, RADIUS, i));
        curX += interval;
    }
    arrayOfVertex.push(new Vertex(0, 0, RADIUS, 11));
    return arrayOfVertex;
};

const drawArrow = (fromX, fromY, toX, toY) => {
    const height = RADIUS / 2;
    const angle = Math.atan2(toY - fromY, toX - fromX);
    const arrowX = toX - RADIUS * Math.cos(angle);
    const arrowY = toY - RADIUS * Math.sin(angle);
    ctx.beginPath();
    ctx.moveTo(
        arrowX - height * Math.cos(angle - Math.PI / 6),
        arrowY - height * Math.sin(angle - Math.PI / 6)
    );
    ctx.lineTo(arrowX, arrowY);
    ctx.lineTo(
        arrowX - height * Math.cos(angle + Math.PI / 6),
        arrowY - height * Math.sin(angle + Math.PI / 6)
    );
    ctx.closePath();
    ctx.fill();
};

const drawLine = (ver1, ver2, isArrow) => {
    ctx.beginPath();
    ctx.moveTo(ver1.x, ver1.y);
    ctx.lineTo(ver2.x, ver2.y);
    ctx.stroke();
    isArrow && drawArrow(ver1.x, ver1.y, ver2.x, ver2.y);
};

const drawSelfLine = (ver, isArrow) => {
    let height = 50;
    if (ver.y > 0) height = -height;
    ctx.beginPath();
    ctx.moveTo(ver.x, ver.y);
    ctx.lineTo(ver.x - RADIUS, ver.y - height);
    ctx.lineTo(ver.x + RADIUS, ver.y - height);
    ctx.closePath();
    ctx.stroke();
    isArrow && drawArrow(ver.x + RADIUS, ver.y - height, ver.x, ver.y);
};

export const drawConnection = (ver1, ver2, isArrow = false) => {
    if (ver1 === ver2) {
        drawSelfLine(ver1, isArrow);
        return;
    }

    if (
        Math.round(ver1.y) === Math.round(ver2.y) &&
        Math.abs(ver1.number - ver2.number) != 1
    ) {
        drawArc(ver1, ver2, isArrow);
    } else if (
        Math.round(ver1.x) === Math.round(ver2.x) &&
        Math.abs(ver1.number - ver2.number) != 1
    ) {
        drawArc(ver1, ver2, isArrow);
    } else if (
        Math.abs(ver2.number - ver1.number) === 5 &&
        ver2.number != N &&
        ver1.number != N
    ) {
        drawArc(ver1, ver2, isArrow);
    } else {
        drawLine(ver1, ver2, isArrow);
    }
};

export const drawArc = (ver1, ver2, isArrow = false) => {
    let middleX = (ver1.x + ver2.x) / 2;
    let middleY = (ver1.y + ver2.y) / 2;
    let radius = Math.max(Math.abs(ver2.x - ver1.x), Math.abs(ver2.y - ver1.y));

    middleX += (ver2.y - ver1.y) / 5;
    middleY += (ver2.x - ver1.x) / 5;

    ctx.beginPath();
    ctx.moveTo(ver1.x, ver1.y);
    ctx.arcTo(middleX, middleY, ver2.x, ver2.y, radius);
    ctx.lineTo(ver2.x, ver2.y);
    ctx.stroke();

    isArrow && drawArrow(middleX, middleY, ver2.x, ver2.y);
};

export const resetCanvas = () => {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(canvas.width / 2, canvas.height / 2);
    vertices.forEach((el) => el.drawVertex());
};

export const vertices = fillVertexes();
