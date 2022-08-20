'use strict';

const axios = require('axios');
let cache = require('./cache.js');

function getWeather(req) {
  const { lat, lon } = req.query;
  const key = 'weather-' + lat + lon;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lang=en&lat=${lat}${lon}&days=5`;

  if (cache[key] && Date.now() - cache[key].timestamp < 50000) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios
      .get(url)
      .then((weatherRes) => parseWeather(weatherRes.data));
  }
  return cache[key].data;
}

function parseWeather(weatherRes) {
  try {
    const weatherArray = weatherRes.data.map((weather) => {
      return new Forecast(weather);
    });
    return Promise.resolve(weatherArray);
  } catch (error) {
    return Promise.reject(error);
  }
}
class Forecast {
  constructor(obj) {
    this.description =
      'Low of ' +
      obj.low_temp +
      ', high of ' +
      obj.high_temp +
      ' with ' +
      obj.weather.description.toLowerCase();
    this.date = obj.datetime;
  }
}

module.exports = getWeather;
