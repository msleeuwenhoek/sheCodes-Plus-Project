function adjustDate() {
  let todaysDate = new Date();
  let dateHeading = document.querySelector("#todaysDate");
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[todaysDate.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Agustus",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[todaysDate.getMonth()];
  let date = todaysDate.getDate();
  let year = todaysDate.getFullYear();
  dateHeading.innerHTML = `${day}, ${month} ${date}, ${year}`;
}

function updateTime() {
  let todaysDate = new Date();
  let timeHours = ("0" + todaysDate.getHours()).slice(-2);
  let timeMinutes = ("0" + todaysDate.getMinutes()).slice(-2);

  document.querySelector(
    "#time-update"
  ).innerHTML = `Last updated - ${timeHours}:${timeMinutes}`;
}

function updateTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#temperatureToday").innerHTML = temperature;
}

function updateCity(response) {
  let city = response.data.name;
  document.querySelector("#city-heading").innerHTML = city;
}

function updateWeatherDescription(response) {
  let weather = response.data.weather[0].main;
  document.querySelector("#weatherDescription").innerHTML = weather;
}

function updateHumidity(response) {
  let humidity = response.data.main.humidity;
  document.querySelector("#humidity").innerHTML = humidity;
}

function updateWeatherIcon(response) {
  let iconId = response.data.weather[0].icon;
  document.getElementById(
    "todaysIcon"
  ).src = `http://openweathermap.org/img/wn/${iconId}@2x.png`;
}

function updateWeather(response) {
  let weatherData = response;
  updateTemperature(weatherData);
  updateCity(weatherData);
  updateWeatherDescription(weatherData);
  updateHumidity(weatherData);
  updateWeatherIcon(weatherData);
}

function capitalize(string) {
  let stringTrimmed = string.toLowerCase().trim();
  let stringElements = stringTrimmed.split(" ");
  for (let i = 0; i < stringElements.length; i++) {
    stringElements[i] =
      stringElements[i].charAt(0).toUpperCase() + stringElements[i].slice(1);
  }
  let capitalizedString = stringElements.join(" ");
  return capitalizedString;
}

function searchCity(event) {
  event.preventDefault();
  locationClicked = false;
  changeToCelsius();

  let city = document.querySelector(".form-control").value;

  let cityCapitalized = capitalize(city);
  let apiKey = "3a3fb11a6316d75f69f5016b49163029";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityCapitalized}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(updateWeather);
}

function updateLocation(position) {
  changeToCelsius();
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "3a3fb11a6316d75f69f5016b49163029";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(updateWeather);
}

function getLocation() {
  locationClicked = true;
  navigator.geolocation.getCurrentPosition(updateLocation);
}

function changeToRotterdam() {
  let city = "Rotterdam";
  let apiKey = "3a3fb11a6316d75f69f5016b49163029";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(updateWeather);
}

function changeToCelsius() {
  isMetric = true;

  let rightUnit = document.querySelector("#right-unit");
  rightUnit.innerHTML = "°F";
  let leftUnit = document.querySelector("#left-unit");
  leftUnit.innerHTML = "°C";

  let city = "Rotterdam";
  if (locationClicked) {
    city = document.querySelector("#city-heading").textContent;
  } else {
    if (document.querySelector(".form-control").value !== "") {
      city = document.querySelector(".form-control").value;
    }
  }

  let apiKey = "3a3fb11a6316d75f69f5016b49163029";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(updateTemperature);
}

function changeToFahrenheit() {
  isMetric = false;

  let rightUnit = document.querySelector("#right-unit");
  rightUnit.innerHTML = "°C";
  let leftUnit = document.querySelector("#left-unit");
  leftUnit.innerHTML = "°F";

  let city = "Rotterdam";
  if (locationClicked) {
    city = document.querySelector("#city-heading").textContent;
  } else {
    if (document.querySelector(".form-control").value !== "") {
      city = document.querySelector(".form-control").value;
    }
  }

  let apiKey = "3a3fb11a6316d75f69f5016b49163029";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(updateTemperature);
}
let locationClicked = false;
let isMetric = true;
changeToRotterdam();
changeToCelsius();
adjustDate();
updateTime();

let searchForm = document.querySelector("#search-section");
searchForm.addEventListener("submit", searchCity);

let locationButton = document.querySelector(".locationButton");
locationButton.addEventListener("click", getLocation);

let unitsButton = document.querySelector("#right-unit");
unitsButton.addEventListener("click", function () {
  if (isMetric) {
    changeToFahrenheit();
  } else {
    changeToCelsius();
  }
});
