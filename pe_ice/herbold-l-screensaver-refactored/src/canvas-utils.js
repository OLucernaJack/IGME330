import { getRandomInt, getRandomColor } from "./utils.js";

export const drawRectangle = (ctx, x, y, width, height, fillStyle = "black", lineWidth = 0, strokeStyle = "black") => {
    ctx.save();
    ctx.fillStyle = fillStyle;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.restore();
}

export const drawArc = (ctx, x, y, radius, startAngle = 0, endAngle = 2 * Math.PI, fillStyle = "black", lineWidth = 0, strokeStyle = "black") => {
    ctx.save();
    ctx.fillStyle = fillStyle;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.restore();
}

export const drawLine = (ctx, x1, y1, x2, y2, lineWidth = 1, strokeStyle = "black") => {
    ctx.save();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
}

export const drawRandomRect = ctx => {
    drawRectangle(ctx,
        getRandomInt(0, 640),   //random x location
        getRandomInt(0, 480),   //random y location
        getRandomInt(10, 200),  //random width
        getRandomInt(10, 200),  //random height
        getRandomColor(),       //random fill color
        getRandomInt(1, 12),    //random line width
        getRandomColor()        //random line color
    );
}

export const drawRandomArc = ctx => {
    drawArc(ctx,
        getRandomInt(0, 640),
        getRandomInt(0, 480),
        getRandomInt(0, 50),
        getRandomInt(0, Math.PI),
        getRandomInt(Math.PI, Math.PI * 2),
        getRandomColor(),
        getRandomInt(1, 12),
        getRandomColor()
    );
}

export const drawRandomLine = ctx => {
    drawLine(ctx,
        getRandomInt(0, 640),
        getRandomInt(0, 480),
        getRandomInt(0, 640),
        getRandomInt(0, 480),
        getRandomInt(1, 12),
        getRandomColor()
    );
}