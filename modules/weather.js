'use strict';

const axios = require('axios');

async function getWeather(req) {
  const { lat, lon } = req.query;
  try {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&days=5&lat=${lat}&lon=${lon}`;
    console.log('URL: ', url);
    const weatherData = await axios.get(url);
    const weatherArr = weatherData.data.data.map((day) => new Forecast(day));
    // res.status(200).send(weatherArr);
    return Promise.resolve(weatherArr);
  } catch (error) {
    console.error(error);
    // res.status(500).send('weather not found');
    return Promise.reject(error);
  }
}

class Forecast {
  constructor(day) {
    this.day = day.valid_date;
    this.description = day.weather.description;
  }
}

module.exports = getWeather;
