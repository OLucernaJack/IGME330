import * as map from "./map.js";

function init() {
    map.initMap();
    map.loadMarkers();
    map.addMarkersToMap();
}

export { init };