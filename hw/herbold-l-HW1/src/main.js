import { getRandom } from "./utils.js";

let words;

function loadJsonXHR() {
    const url = "./data/babble-data.json";
    const xhr = new XMLHttpRequest;
    xhr.onload = (e) => {
        console.log(`XHR Status: ${e.target.status}`);
        let json;
        try {
            json = JSON.parse(e.target.responseText);
        }
        catch {
            document.querySelector("#output").innerHTML = "JSON Invalid";
            return;
        }
        //WORK ON THIS TO FINSIH HW
        const words1 = json["words1"];
        const words2 = json["words2"];
        const words3 = json["words3"];

        const allWords = [words1, words2, words3];

        words = allWords;

        //start up get words
        getWords(1);
    }
    xhr.onerror = e => console.log(`OnError Status: ${e.target.status}`);
    xhr.open("GET", url);
    xhr.send();
}

const getWords = numLines => {
    for (let i = 0; i < numLines; i++) {
        const firstWord = getRandom(words[0]);
        const secondWord = getRandom(words[1]);
        const thirdWord = getRandom(words[2]);

        if (i == 0) {
            document.querySelector("#output").innerHTML = `${firstWord} ${secondWord} ${thirdWord}`;
        }
        else {
            document.querySelector("#output").innerHTML += `<br>${firstWord} ${secondWord} ${thirdWord}`;
        }
    }
}

const init = () => {
    loadJsonXHR();
    const button = document.querySelector("#button-1");
    const buttonExtra = document.querySelector("#button-5");
    button.addEventListener("click", () => { getWords(1) });
    buttonExtra.addEventListener("click", () => { getWords(5) });

}

init();