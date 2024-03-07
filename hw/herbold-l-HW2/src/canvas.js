/*
    The purpose of this file is to take in the analyser node and a <canvas> element: 
      - the module will create a drawing context that points at the <canvas> 
      - it will store the reference to the analyser node
      - in draw(), it will loop through the data in the analyser node
      - and then draw something representative on the canvas
      - maybe a better name for this file/module would be *visualizer.js* ?
*/

class Sprite {
    constructor(x, y, radius, color, MAX, MIN) {
        Object.assign(this, { x, y, radius, color, MAX, MIN });
        Object.seal(this);
    }

    update(params) {

        let direction = 1;
        if (params.showFreq) {
            this.y = 5;
            if (this.x < this.MIN || this.x > this.MAX) {
                direction = direction * -1;
                this.x += direction;
            }
            this.x += direction;
        }
        if (params.showTime) {
            this.x = 5;
            if (this.y < this.MIN || this.y > this.MAX) {
                direction = direction * -1;
                this.y += direction;
            }
            this.y += direction;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }
}



import * as utils from './utils.js';

let ctx, canvasWidth, canvasHeight, gradient, analyserNode, audioData, barRotation = 0;

let spriteArray = [];

const setupCanvas = (canvasElement, analyserNodeRef) => {
    // create drawing context
    ctx = canvasElement.getContext("2d");
    canvasWidth = canvasElement.width;
    canvasHeight = canvasElement.height;
    // create a gradient that runs top to bottom
    gradient = utils.getLinearGradient(ctx, 0, 0, 0, canvasHeight, [{ percent: 0, color: "blue" }, { percent: .25, color: "lightseagreen" }, { percent: .5, color: "aquamarine" }, { percent: .75, color: "skyblue" }, { percent: 1, color: "slateblue" }]);
    // keep a reference to the analyser node
    analyserNode = analyserNodeRef;
    // this is the array where the analyser data will be stored
    audioData = new Uint8Array(analyserNode.fftSize / 2);

}

const draw = (params = {}) => {
    // 1 - populate the audioData array with the frequency data from the analyserNode
    // notice these arrays are passed "by reference" 
    if (params.showFreq) {
        analyserNode.getByteFrequencyData(audioData);
    }


    // OR
    if (params.showTime) {
        analyserNode.getByteTimeDomainData(audioData);
    }
    // // waveform data
    spriteArray.push(new Sprite(40, 40, 3, "red", 50, 30));
    spriteArray.push(new Sprite(400, 40, 3, "blue", 50, 30));
    // 2 - draw background 

    ctx.save();
    ctx.fillStyle = "black";
    ctx.globalAlpha = .1;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.restore();

    // 3 - draw gradient
    // if (params.showGradient) {
    //     ctx.save();
    //     ctx.fillStyle = gradient;
    //     ctx.globalAlpha = 0.3;
    //     ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    //     ctx.restore();
    // }
    for (let s of spriteArray) {
        s.update(params)
        s.draw(ctx);
    }

    // 4 - draw bars
    if (params.showBars) {
        const BAR_WIDTH = 10;
        const MAX_BAR_HEIGHT = 100;
        const PADDING = 2;
        const MIDDLE_Y = canvasHeight / 2;
        const MIDDLE_X = canvasWidth / 2;



        ctx.save();
        ctx.translate(MIDDLE_X, MIDDLE_Y / 2 - 100);

        for (let b of audioData) {
            let percent = b / 255;
            if (percent < .02) percent = .02;
            ctx.translate(BAR_WIDTH, 0);
            ctx.rotate(Math.PI * 2 / 128);
            ctx.save(); //for flip
            ctx.rotate(barRotation);
            ctx.scale(1, -1);
            ctx.fillStyle = `rgba(${b},${b - 128},${255 - b},.3)`;
            ctx.fillRect(0, 0, BAR_WIDTH, MAX_BAR_HEIGHT * percent * (params.volumeLevel / 100));
            ctx.restore();
            ctx.translate(PADDING, 0);

        }


        //ctx.restore();
        ctx.restore();
        barRotation += 0.01;

    }

    // 5 - draw circles
    if (params.showCircles) {
        let maxRadius = params.volumeLevel * 2;
        ctx.save();
        ctx.globalAlpha = 0.5;
        for (let i = 0; i < audioData.length; i++) {
            //reddish
            let percent = audioData[i] / 255;

            let circleRadius = percent * maxRadius;
            ctx.beginPath();
            ctx.fillStyle = utils.makeColor(255, 200, 200, .34 - percent / 3.0);
            ctx.arc(canvasWidth / 2, params.volumeLevel + canvasHeight / 2 - 100, circleRadius, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();

            //bluish
            ctx.beginPath();
            ctx.fillStyle = utils.makeColor(200, 200, 255, .10 - percent / 10.0);
            ctx.arc(canvasWidth / 2, params.volumeLevel + canvasHeight / 2 - 100, circleRadius * 1.5, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();

            //yellowish
            //ctx.save();
            ctx.beginPath();
            ctx.fillStyle = utils.makeColor(200, 200, 100, .5 - percent / 5.0);
            ctx.arc(canvasWidth / 2, params.volumeLevel + canvasHeight / 2 - 100, circleRadius * .50, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();
            //ctx.restore();
        }
        ctx.restore();
    }





    // 6 - bitmap manipulation
    // TODO: right now. we are looping though every pixel of the canvas (320,000 of them!), 
    // regardless of whether or not we are applying a pixel effect
    // At some point, refactor this code so that we are looping though the image data only if
    // it is necessary

    // A) grab all of the pixels on the canvas and put them in the `data` array
    // `imageData.data` is a `Uint8ClampedArray()` typed array that has 1.28 million elements!
    // the variable `data` below is a reference to that array 
    let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    let data = imageData.data;
    let length = data.length;
    let width = data.width;
    let limit = data.length;
    // B) Iterate through each pixel, stepping 4 elements at a time (which is the RGBA for 1 pixel)

    for (let i = 0; i < length; i += 4) {
        // C) randomly change every 20th pixel to red
        if (params.showNoise && Math.random() < .001) {
            // data[i] is the red channel
            // data[i+1] is the green channel
            // data[i+2] is the blue channel
            // data[i+3] is the alpha channel
            data[i] = data[i + 1] = data[i + 2] = 0;// zero out the red and green and blue channels
            data[i] = utils.getRandom(0, 255);
            data[i + 1] = utils.getRandom(0, 255);
            data[i + 2] = utils.getRandom(0, 255);
        } // end if

        if (params.showInvert) {
            let red = data[i], green = data[i + 1], blue = data[i + 2];
            data[i] = 255 - red;
            data[i + 1] = 255 - green;
            data[i + 2] = 255 - blue;
        }
    } // end for



    // D) copy image data back to canvas
    ctx.putImageData(imageData, 0, 0);


}

export { setupCanvas, draw };