const words1 = ["Acute", "Aft", "Anti-matter", "Bipolar", "Cargo", "Command", "Communication", "Computer", "Deuterium", "Dorsal", "Emergency", "Engineering", "Environmental", "Flight", "Fore", "Guidance", "Heat", "Impulse", "Increased", "Inertial", "Infinite", "Ionizing", "Isolinear", "Lateral", "Linear", "Matter", "Medical", "Navigational", "Optical", "Optimal", "Optional", "Personal", "Personnel", "Phased", "Reduced", "Science", "Ship's", "Shuttlecraft", "Structural", "Subspace", "Transporter", "Ventral"];

const words2 = ["Propulsion", "Dissipation", "Sensor", "Improbability", "Buffer", "Graviton", "Replicator", "Matter", "Anti-matter", "Organic", "Power", "Silicon", "Holographic", "Transient", "Integrity", "Plasma", "Fusion", "Control", "Access", "Auto", "Destruct", "Isolinear", "Transwarp", "Energy", "Medical", "Environmental", "Coil", "Impulse", "Warp", "Phaser", "Operating", "Photon", "Deflector", "Integrity", "Control", "Bridge", "Dampening", "Display", "Beam", "Quantum", "Baseline", "Input"];

const words3 = ["Chamber", "Interface", "Coil", "Polymer", "Biosphere", "Platform", "Thruster", "Deflector", "Replicator", "Tricorder", "Operation", "Array", "Matrix", "Grid", "Sensor", "Mode", "Panel", "Storage", "Conduit", "Pod", "Hatch", "Regulator", "Display", "Inverter", "Spectrum", "Generator", "Cloud", "Field", "Terminal", "Module", "Procedure", "System", "Diagnostic", "Device", "Beam", "Probe", "Bank", "Tie-In", "Facility", "Bay", "Indicator", "Cell"];

console.log(words1[0]);

import { getRandom } from "./utils";

const getWords = numLines => {
    for (let i = 0; i < numLines; i++) {
        const firstWord = getRandom(words1);
        const secondWord = getRandom(words2);
        const thirdWord = getRandom(words3);

        if (i == 0) {
            document.querySelector("#output").innerHTML = `${firstWord} ${secondWord} ${thirdWord}`;
        }
        else {
            document.querySelector("#output").innerHTML += `<br>${firstWord} ${secondWord} ${thirdWord}`;
        }

    }




}

const init = () => {
    const button = document.querySelector("#button-1");
    const buttonExtra = document.querySelector("#button-5");
    button.addEventListener("click", () => { getWords(1) });
    buttonExtra.addEventListener("click", () => { getWords(5) });
    getWords(1);
}

window.onload = init;