'use strict';

const axios = require('axios');
let cache = require('./cache.js');

function getWeather(req) {
  const { lat, lon } = req.query;
  const key = 'weather-' + lat + lon;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&days=5&lat=${lat}&lon=${lon}`;

  if (cache[key] && Date.now() - cache[key].timestamp < 50000) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios
      .get(url)
      .then((response) => parseWeather(response.data));
  }
  return cache[key].data;
}

function parseWeather(weatherData) {
  try {
    const weatherSummaries = weatherData.data.map((day) => {
      return new Forecast(day);
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Forecast {
  constructor(day) {
    this.day = day.valid_date;
    this.description = day.weather.description;
  }
}

module.exports = getWeather;
