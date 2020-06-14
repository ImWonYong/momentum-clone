const weather = document.querySelector(".js-weather");

const API_KEY = "073297efa92894a679c3eac3423d4e1b";
const COORDS = "coords";

function getWeather(lat, lon) {
  //데이터를 얻는 법
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const icon = new Image();
      const temperature = document.createElement("span");
      const place = document.createElement("span");
      const div = document.createElement("div");
      div.classList.add("weather-container");
      icon.src = `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`;
      temperature.innerText = json.main.temp;
      place.innerText = json.name;

      div.appendChild(temperature);
      div.appendChild(place);
      weather.appendChild(icon);
      weather.appendChild(div);
    });
}

function handleGeoError() {
  console.log("Can't access geo location");
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  getWeather(latitude, longitude);
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
