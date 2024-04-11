import { vertices } from './draw.js';

export const resetCanvas = () => {
    ctx1.setTransform(1, 0, 0, 1, 0, 0);
    ctx1.clearRect(0, 0, canvas.width, canvas.height);
    ctx1.translate(canvas.width / 2, canvas.height / 2);
    vertices.forEach((el) => el.drawVertex());
};

const normalizeCtx = (ctx, canva) => {
    ctx.translate(canva.width / 2, canva.height / 2);
    ctx.globalCompositeOperation = 'destination-over';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '22px serif';
};

export const canvas = document.getElementById('canvas');
export const ctx1 = canvas.getContext('2d');
normalizeCtx(ctx1, canvas);

export const canvasComponents = document.getElementById('canvas-components');
canvasComponents.width = document.querySelector('.right-part').offsetWidth;
export const ctx2 = canvasComponents.getContext('2d');
normalizeCtx(ctx2, canvasComponents);
