// usar .env en local
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

exports.handler = async function (event, context) {
  try {
    const city = event.queryStringParameters.city;
    const APIKey = process.env.WEATHER_API_KEY;

    // Usar fetch en Node.js
    let fetch;
    if (typeof window === 'undefined') {
      fetch = (await import('node-fetch')).default;
    } else {
      fetch = window.fetch;
    }
    
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
    );
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error(error); // error en consola
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error al obtener los datos del tiempo" }),
    };
  }
};
