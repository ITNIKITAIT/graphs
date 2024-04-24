export class Vertex {
    constructor(x, y, r, number, ctx) {
        (this.x = x), (this.y = y);
        this.r = r;
        this.number = number;
        this.ctx = ctx;
        this.state = 'new';
    }
    drawVertex() {
        let color = 'black';
        if (this.state === 'current') color = 'blue';
        if (this.state === 'opened') color = 'red';

        this.ctx.globalCompositeOperation = 'source-over';
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillText(this.number, this.x, this.y);
        this.ctx.fillStyle = 'black';
        this.ctx.globalCompositeOperation = 'destination-over';
    }
    set newState(value) {
        this.state = value;
        this.drawVertex();
    }
    get newState() {
        return this.state;
    }
}

export class StrongVertex {
    constructor(x, y, r, name, ctx) {
        (this.x = x), (this.y = y);
        this.r = r;
        this.name = name;
        this.ctx = ctx;
        this.connections = [];
    }
    drawVertex() {
        this.ctx.beginPath();
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillText(this.name, this.x, this.y);
        this.ctx.fillStyle = 'black';
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        this.ctx.fill();
    }
    setConnect(ver) {
        this.connections.push(ver);
    }
}
