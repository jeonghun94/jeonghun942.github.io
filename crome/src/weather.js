const API_KEY = "8ddc3b89597f00e79eee6b94f5279d86";
const COORDS = "coords";
const weather = document.querySelector(".js-weather");

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temp = json.main.temp;
      const place = json.name;
      weather.innerText = `${temp}@${place}`;
    });
}

function saveCoodrs(obj) {
  localStorage.setItem(COORDS, JSON.stringify(obj));
}

function getSucces(positon) {
  const latitude = positon.coords.latitude;
  const longitude = positon.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };

  saveCoodrs(coordsObj);
  getWeather(latitude, longitude);
}

function getError() {
  console.log("access error!");
}

function getCoords() {
  navigator.geolocation.getCurrentPosition(getSucces, getError);
}

function loadCoords() {
  const loadCoords = localStorage.getItem(COORDS);
  if (loadCoords === null) {
    getCoords();
  } else {
    const parse = JSON.parse(loadCoords);
    getWeather(parse.latitude, parse.longitude);
  }
}

function init() {
  loadCoords();
}

init();
