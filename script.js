const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "aaa932ef4ea95017a674c82497470181";

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value;
  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      dislpayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError("Plese Enter City Name");
  }
});

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Unable to fetch weather data");
  }
  return await response.json();
}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}

function changeBackgroundColor(weatherId) {
  const body = document.querySelector("body");
  let gradient;
  let color;
  switch (true) {
    case weatherId >= 200 && weatherId < 300:
      gradient = "linear-gradient(#666666, #000000)";
      color = "#ffffff";
      break;
    case weatherId >= 300 && weatherId < 600:
      gradient = "linear-gradient(#6c7a89, #29465b)";
      color = "#ffffff";
      break;
    case weatherId >= 600 && weatherId < 700:
      gradient = "linear-gradient(#ffffff, #d9d9d9)";
      color = "#000000";
      break;
    case weatherId >= 700 && weatherId < 800:
      gradient = "linear-gradient(#bdbdbd, #808080)";
      color = "#000000";
      break;
    case weatherId == 800:
      gradient = "linear-gradient(#2196F3, #963200)";
      color = "#ffffff";
      break;
    case weatherId > 800:
      gradient = "linear-gradient(#f0f0f0, #c0c0c0)";
      color = "#000000";
      break;
    default:
      gradient = "linear-gradient(#ffffff, #d3d3d3)";
      color = "#000000";
  }
  body.style.backgroundImage = gradient;
  body.style.color = color;
  body.style.backgroundRepeat = "no-repeat";
  body.style.backgroundAttachment = "fixed";
}

function dislpayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    wind: { speed },
    weather: [{ description, icon, id }],
  } = data;
  card.textContent = "";
  card.style.display = "flex";
  const weatherImg = document.createElement("div");
  const img = document.createElement("img");
  const weatherData = document.createElement("div");
  const tempDisplay = document.createElement("h1");
  const descDisplay = document.createElement("h2");
  const div = document.createElement("div");
  const x1 = document.createElement("span");
  const humidityImg = document.createElement("img");
  const humData = document.createElement("span");
  const humDatah1 = document.createElement("h2");
  const humDatah2 = document.createElement("h2");
  const x2 = document.createElement("span");
  const windImg = document.createElement("img");
  const windData = document.createElement("span");
  const windDatah1 = document.createElement("h2");
  const windDatah2 = document.createElement("h2");
  card.appendChild(weatherImg);
  weatherImg.classList.add("weatherImg");
  card.appendChild(weatherData);
  weatherImg.appendChild(img);
  weatherData.classList.add("weatherData");
  weatherData.appendChild(tempDisplay);
  weatherData.appendChild(descDisplay);
  descDisplay.classList.add("sky");
  weatherData.appendChild(div);
  div.appendChild(x1);
  x1.classList.add("x");
  x1.appendChild(humidityImg);
  x1.appendChild(humData);
  humData.appendChild(humDatah1);
  humData.appendChild(humDatah2);
  div.appendChild(x2);
  x2.classList.add("x");
  x2.appendChild(windImg);
  x2.appendChild(windData);
  windData.appendChild(windDatah1);
  windData.appendChild(windDatah2);
  tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
  descDisplay.textContent = description;
  img.src = `assests/${icon}.png`;
  humDatah1.textContent = `${humidity}%`;
  humidityImg.src = `assests/humidity.png`;
  windDatah1.textContent = `${speed}m/s`;
  windImg.src = `assests/wind.png`;
  humDatah2.textContent = "Humidity";
  windDatah2.textContent = "Wind Speed";
  changeBackgroundColor(id);
}
