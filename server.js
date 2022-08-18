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
app.get('/weather', getWeather);

// endpoint movies data
app.get('/movies', getMovies);

// error handling middleware
app.use((error, request, response, next) => {
  console.log(error);
  response.status(500).send(error.message);
});

// listen on PORT/always last line of code
app.listen(PORT, console.log(`listening on PORT ${PORT}`));
