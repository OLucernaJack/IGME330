import { getRandomColor, getRandomInt } from "./utils.js";
import { drawRectangle, drawArc, drawLine, drawRandomRect, drawRandomArc, drawRandomLine } from "./canvas-utils.js";

let ctx;
let canvas;
let paused = false;
let createRects = true;
let createArcs = true;
let createLines = true;

const init = () => {
    console.log("page loaded!");
    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");
    setupUI();
    update(ctx);
}

const setupUI = () => {
    //get all buttons and checkboxes
    const playButton = document.querySelector("#btn-play");
    const pauseButton = document.querySelector("#btn-pause");
    const clearButton = document.querySelector("#btn-clear");
    const rectsCheck = document.querySelector("#cb-rectangles");
    const arcsCheck = document.querySelector("#cb-arcs");
    const linesCheck = document.querySelector("#cb-lines");

    //control event listeners
    playButton.addEventListener("click", () => { playControl("play") });
    pauseButton.addEventListener("click", () => { playControl("pause") });
    clearButton.addEventListener("click", () => { playControl("clear") });
    rectsCheck.addEventListener("change", () => { playControl("rect-checkbox", rectsCheck) });
    arcsCheck.addEventListener("change", () => { playControl("arc-checkbox", arcsCheck) });
    linesCheck.addEventListener("change", () => { playControl("line-checkbox", linesCheck) });

    //canvas spray paint 
    canvas.onclick = canvasClicked;
}

const update = () => {
    requestAnimationFrame(update);
    if (paused) return;
    else {
        if (createRects) drawRandomRect(ctx);
        if (createArcs) drawRandomArc(ctx);
        if (createLines) drawRandomLine(ctx);
    }

}

const playControl = (btnType, btn = null) => {
    if (btnType == "play") {
        paused = false;
    }
    if (btnType == "pause") {
        paused = true;
    }
    if (btnType == "clear") {
        drawRectangle(ctx, 0, 0, 640, 480, "white", 0);
    }
    if (btnType == "rect-checkbox") {
        createRects = btn.checked;
    }
    if (btnType == "arc-checkbox") {
        createArcs = btn.checked;
    }
    if (btnType == "line-checkbox") {
        createLines = btn.checked;
    }

}

const canvasClicked = e => {
    let rect = e.target.getBoundingClientRect();
    let mouseX = e.clientX - rect.x;
    let mouseY = e.clientY - rect.y;
    console.log(mouseX, mouseY);


    for (let i = 0; i < 10; i++) {
        let x = getRandomInt(-50, 50) + mouseX;
        let y = getRandomInt(-50, 50) + mouseY;
        drawArc(ctx, x, y, getRandomInt(5, 20), 0, Math.PI * 2, getRandomColor(), getRandomInt(0, 4), getRandomColor());
    }


}

init();