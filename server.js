'use strict';

// requires - similar to imports
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const weather = require('./data/weather.json');

// instance express server
const app = express();

//middleware
app.use(cors());

// set PORT variable
const PORT = process.env.PORT || 3002;

class Forecast {
  constructor(searchQuery) {
    let cityData = weather.find(
      (city) => city.city_name.toLowerCase() === searchQuery.toLowerCase()
    );
    this.cityName = cityData;
  }
  getWeather() {
    return this.cityName.data.map((city) => ({
      description: city.weather.description,
      date: city.datetime,
    }));
  }
}

// home route/endpoint - always (/)
app.get('/', (request, response) => {
  response.send('proof of life');
});

// endpoint weather data
app.get('/weather', (req, res, next) => {
  try {
    const searchQuery = req.query.searchQuery;
    const weather = new Forecast(searchQuery);
    const cityForecast = weather.getWeather();
    res.status(200).send(cityForecast);
  } catch (error) {
    next(error);
  }
});

// error handling middleware
app.use((error, request, response, next) => {
  console.log(error);
  response.status(500).send(error.message);
});

// listen on PORT/always last line of code
app.listen(PORT, console.log(`listening on PORT ${PORT}`));
