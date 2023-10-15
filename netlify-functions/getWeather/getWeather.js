// weather.js (en tu directorio de funciones de Netlify)
require('dotenv').config();
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    try {
        const city = event.queryStringParameters.city;
        const APIKey = process.env.WEATHER_API_KEY;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`);
        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error al obtener los datos del tiempo' })
        };
    }
};
