// Seleccionar elementos del DOM
const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

// Click al icono para buscar
search.addEventListener("click", () => {
  const city = document.querySelector(".search-box input").value;

  if (city === "") return;

  // Llamada a la función de Netlify
  fetch(`/.netlify/functions/getWeather?city=${city}`)
    .then((response) => {
      //console.log("Response: ", response); // Añadido para debugging
      //console.log("Response.status: ", response.status); // Añadido para debugging
      return response.json();
    })

    .then((json) => {
      if (json.cod === "404") {
        handleNotFound();
        return;
      }

      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      // Esto es para seleccionar elementos de la card
      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      updateWeatherImage(json.weather[0].main, image);
      updateWeatherData(json, temperature, description, humidity, wind);

      // Animación de la card
      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "590px";
    })
    .catch((error) => {
      // Manejo de errores
      console.error("Error fetching weather data:", error);
      handleNotFound();
    });
});

// Si no se encuentra la ciudad
function handleNotFound() {
  container.style.height = "400px";
  weatherBox.style.display = "none";
  weatherDetails.style.display = "none";
  error404.style.display = "block";
  error404.classList.add("fadeIn");
}

// Actualizar imagen según el clima
function updateWeatherImage(weatherType, imageElement) {
  switch (weatherType) {
    case "Clear":
      imageElement.src = "images/clear.png";
      break;
    case "Rain":
      imageElement.src = "images/rain.png";
      break;
    case "Snow":
      imageElement.src = "images/snow.png";
      break;
    case "Clouds":
      imageElement.src = "images/cloud.png";
      break;
    case "Mist":
      imageElement.src = "images/mist.png";
      break;
    default:
      imageElement.src = "";
  }
}

// Actualizar datos del clima en la card
function updateWeatherData(
  json,
  temperatureElement,
  descriptionElement,
  humidityElement,
  windElement
) {
  temperatureElement.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
  descriptionElement.innerHTML = `${json.weather[0].description}`;
  humidityElement.innerHTML = `${json.main.humidity}%`;
  windElement.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
}
