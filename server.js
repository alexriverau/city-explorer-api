'use strict';

// requires - similar to imports
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

// instance express server
const app = express();

//middleware
app.use(cors());

// set PORT variable
const PORT = process.env.PORT || 3002;

// home route/endpoint - always (/)
app.get('/', (request, response) => {
  response.send('proof of life');
});

// endpoint weather data
app.get('/weather', getWeather);

async function getWeather(req, res, next) {
  const city  = req.query.searchQuery;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&city=${city}&days=5`;

  try {
    const weatherRes = await axios.get(url);
    const weatherArr = weatherRes.data.data.map(weather => new Forecast(weather));
    res.status(200).send(weatherArr);
  } catch(error) {
    next(error);
  }
}

class Forecast {
  constructor(obj) {
    this.description = 'Low of '+ obj.low_temp + ', high of ' + obj.high_temp + ' with ' + obj.weather.description.toLowerCase();
    this.date = obj.datetime;
  }
}

// endpoint movies data

app.get('/movies', getMovies);

async function getMovies(req, res, next) {
  const city  = req.query.searchQuery;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`;

  try {
    const moviesRes = await axios.get(url);
    const moviesArr = moviesRes.data.results.map(movie => new Movie(movie));
    res.status(200).send(moviesArr);
  } catch(error) {
    next(error);
  }
}

class Movie {
  constructor(obj) {
    this.title = obj.title;
    this.overview = obj.overview;
    this.average_votes = obj.vote_average;
    this.total_votes = obj.vote_count;
    this.image_url = `https://image.tmdb.org/t/p/w500${obj.poster_path}`;
    this.popularity = obj.popularity;
    this.released_on = obj.release_date;
  }
}

// error handling middleware
app.use((error, request, response, next) => {
  console.log(error);
  response.status(500).send(error.message);
});

// listen on PORT/always last line of code
app.listen(PORT, console.log(`listening on PORT ${PORT}`));
