'use strict';

// requires - similar to imports
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const getWeather = require('./modules/weather');
const getMovies = require('./modules/movies');

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
app.get('/weather', async (req, res) => {
  getWeather(req)
    .then((weatherPromise) => res.status(200).send(weatherPromise))
    .catch((error) => res.status(500).send('weather not found' + error));
});

// endpoint movies data
app.get('/movies', async (req, res) => {
  getMovies(req.query.searchQuery)
    .then((moviePromise) => res.status(200).send(moviePromise))
    .catch((error) => res.status(500).send('movies not found' + error));
});

// error handling middleware
app.use('*', (request, response) =>
  response.status(400).send('end point does not exists')
);

// listen on PORT/always last line of code
app.listen(PORT, console.log(`listening on PORT ${PORT}`));
