const defaultCoords = [23.319941, 42.698334];
let coords = defaultCoords;
let mapStyle = "mapbox://styles/mapbox/dark-v9";

var map, firstMarker, firstPopup, isOpenPopup, infoBar;

const loadMapGetToken = () => {
  fetch("./config.json")
    .then((response) => response.json())
    .then((data) => {
      loadMap(data["MAPBOX-TOKEN"]);
    });
};

const loadMap = (token) => {
  mapboxgl.accessToken = token;

  map = new mapboxgl.Map({
    container: "map",
    style: mapStyle,
    center: coords,
    zoom: 17,
    pitch: 55,
    maxPitch: 85,
    minZoom: 5,
    interactive: true,
  });

  firstPopup = new mapboxgl.Popup()
    .setLngLat([23.319941, 42.698334])
    .setHTML("<h1>Hello World!</h1>")
    .addTo(map);

  firstMarker = new mapboxgl.Marker({
    color: "#5CDB95",
    draggable: false,
    interactive: true,
  })
    .setLngLat([23.319941, 42.698334])
    .setPopup(firstPopup) // add popup
    .addTo(map);

  map.on("load", () => {
    let lat = 42.698334,
      lon = 23.319941;
    var radius = 0.1; // 100 meters
    var center = [lon, lat];
    var options = {
      steps: 50,
      units: "kilometers",
      properties: { foo: "bar" },
    };

    var _circle = turf.circle(center, radius, options);

    map.addSource("circleData", {
      type: "geojson",
      data: _circle,
    });

    map.addLayer({
      id: "circle-fill",
      type: "fill",
      source: "circleData",
      paint: {
        "fill-color": "green",
        "fill-opacity": 0.2,
      },
    });
  });
};

function checkPopupOpen() {
  if (firstPopup.isOpen()) openInfoPopup();
  if (!firstPopup.isOpen()) closeInfoPopup();
}

function updateCoords(newCoords) {
  coords = newCoords;
  map.flyTo({ center: coords, zoom: 17 });
}

function updateInfo() {
  firstPopup.setHTML(
    `<h1>НПГ-1 \n</h1> <h3> eCO2: ${mqttReceivedMessageECO2} </h3> <h3> TVOC: ${mqttReceivedMessageTVOC} </h3> Качеството на въздуха е в нормите.`
  );

  const eco2Quality = document.getElementById("infoBarTextQuality"),
    tvocQuality = document.getElementById("infoBarTextQuality2");

  const eco2Value = parseInt(mqttReceivedMessageECO2),
    tvocValue = parseInt(mqttReceivedMessageTVOC);

  // ECO2
  if (eco2Value < 600) {
    eco2Quality.innerHTML = `Качество eCO2: EXCELLENT (${mqttReceivedMessageECO2} ppm)`;
    eco2Quality.style.color = "#2EA02B";
  } else if (eco2Value < 800) {
    eco2Quality.innerHTML = `Качество eCO2: GOOD (${mqttReceivedMessageECO2} ppm)`;
    eco2Quality.style.color = "#9BC73E";
  } else if (eco2Value < 1100) {
    eco2Quality.innerHTML = `Качество eCO2: FAIR (${mqttReceivedMessageECO2} ppm)`;
    eco2Quality.style.color = "#F7C610";
  } else if (eco2Value < 1500) {
    eco2Quality.innerHTML = `Качество eCO2: MEDIOCRE (${mqttReceivedMessageECO2} ppm)`;
    eco2Quality.style.color = "#F3922A";
  } else {
    eco2Quality.innerHTML = `Качество eCO2: UNHEALTHY (${mqttReceivedMessageECO2} ppm)`;
    eco2Quality.style.color = "#BC161D";
  }

  // TVOC
  if (tvocValue < 65) {
    tvocQuality.innerHTML = `Качество TVOC: EXCELLENT (${mqttReceivedMessageTVOC} ppb)`;
    tvocQuality.style.color = "#2EA02B";
  } else if (tvocValue < 220) {
    tvocQuality.innerHTML = `Качество TVOC: GOOD (${mqttReceivedMessageTVOC} ppb)`;
    tvocQuality.style.color = "#9BC73E";
  } else if (tvocValue < 660) {
    tvocQuality.innerHTML = `Качество TVOC: FAIR (${mqttReceivedMessageTVOC} ppb)`;
    tvocQuality.style.color = "#F7C610";
  } else if (tvocValue < 2200) {
    tvocQuality.innerHTML = `Качество TVOC: MEDIOCRE (${mqttReceivedMessageTVOC} ppb)`;
    tvocQuality.style.color = "#F3922A";
  } else {
    tvocQuality.innerHTML = `Качество TVOC: UNHEALTHY (${mqttReceivedMessageTVOC} ppb)`;
    tvocQuality.style.color = "#BC161D";
  }
}

function openInfoPopup() {
  if (!isOpenPopup) {
    infoBar = document.getElementById("infoBar");

    infoBar.style.visibility = "visible";

    isOpenPopup = true;
  }
}

function closeInfoPopup() {
  if (isOpenPopup) {
    infoBar.style.visibility = "hidden";
    isOpenPopup = false;
  }
}
