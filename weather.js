'use strict';

const axios = require('axios');

async function getWeather(req, res, next) {
  const city = req.query.searchQuery;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&city=${city}&days=5`;

  axios
    .get(url)
    .then((weatherRes) => {
      const weatherArr = weatherRes.data.data.map(
        (weather) => new Forecast(weather)
      );
      res.status(200).send(weatherArr);
    })
    .catch((error) => {
      next(error);
    });
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
