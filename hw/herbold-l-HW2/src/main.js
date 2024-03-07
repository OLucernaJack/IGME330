/*
    main.js is primarily responsible for hooking up the UI to the rest of the application 
    and setting up the main event loop
*/

// We will write the functions in this file in the traditional ES5 way
// In this instance, we feel the code is more readable if written this way
// If you want to re-write these as ES6 arrow functions, to be consistent with the other files, go ahead!

import * as utils from './utils.js';
import * as audio from './audio.js';
import * as canvas from './canvas.js';

const drawParams = {
    showGradient: true,
    showBars: true,
    showCircles: true,
    showNoise: false,
    showInvert: false,
    showEmboss: false
};

// 1 - here we are faking an enumeration
const DEFAULTS = Object.freeze({
    sound1: "./media/New Adventure Theme.mp3"
});

const init = () => {
    console.log("init called");
    console.log(`Testing utils.getRandomColor() import: ${utils.getRandomColor()}`);
    audio.setupWebaudio(DEFAULTS.sound1);
    let canvasElement = document.querySelector("canvas"); // hookup <canvas> element
    setupUI(canvasElement);
    canvas.setupCanvas(canvasElement, audio.analyserNode);
    loop();
}

const setupUI = (canvasElement) => {
    // A - hookup fullscreen button
    const fsButton = document.querySelector("#btn-fs");
    const playButton = document.querySelector("#btn-play");

    // add .onclick event to button
    fsButton.onclick = e => {
        console.log("goFullscreen() called");
        utils.goFullscreen(canvasElement);
    };

    //add .onclick event to button
    playButton.onclick = e => {
        console.log(`audioCtx.state before = ${audio.audioCtx.state}`);

        if (audio.audioCtx.state == "suspended") {
            audio.audioCtx.resume();
        }

        console.log(`audioCtx.state after = ${audio.audioCtx.state}`);

        if (e.target.dataset.playing == "no") {
            audio.playCurrentSound();
            e.target.dataset.playing = "yes";
        }
        else {
            audio.pauseCurrentSound();
            e.target.dataset.playing = "no";
        }

    };

    //C - hookup volume slider & label
    let volumeSlider = document.querySelector("#vol-slide");
    let volumeLabel = document.querySelector("#vol-label");

    //add .oninput to slider
    volumeSlider.oninput = e => {
        //set gain
        audio.setVolume(e.target.value);
        //udate volume label
        volumeLabel.innerHTML = Math.round((e.target.value / 2 * 100));
    }
    //set value of label to match initial value of slider
    volumeSlider.dispatchEvent(new Event("input"));

    //D - hookup track
    let trackSelect = document.querySelector("#select-track");
    //add .onchange event to trackSelect
    trackSelect.onchange = e => {
        audio.loadSoundFile(e.target.value);
        //pause current track if its playing
        if (playButton.dataset.playing == "yes") {
            playButton.dispatchEvent(new MouseEvent("click"));
        }

    }

    //add all checkboxes
    let gradientCB = document.querySelector('#gradient-cb');
    let barsCB = document.querySelector('#bars-cb');
    let circlesCB = document.querySelector('#circles-cb');
    let noiseCB = document.querySelector('#noise-cb');
    let invertCB = document.querySelector('#invert-cb');
    let embossCB = document.querySelector('#emboss-cb');

    //setup events
    gradientCB.addEventListener("change", () => { drawParams.showGradient = gradientCB.checked; });
    barsCB.addEventListener("change", () => { drawParams.showBars = barsCB.checked; });
    circlesCB.addEventListener("change", () => { drawParams.showCircles = circlesCB.checked; });
    noiseCB.addEventListener("change", () => { drawParams.showNoise = noiseCB.checked; });
    invertCB.addEventListener("change", () => { drawParams.showInvert = invertCB.checked; });
    embossCB.addEventListener("change", () => { drawParams.showEmboss = embossCB.checked; });
} // end setupUI

const loop = () => {
    /* NOTE: This is temporary testing code that we will delete in Part II */
    requestAnimationFrame(loop);
    canvas.draw(drawParams);

}
export { init };