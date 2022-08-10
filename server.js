'use strict';

// requires - similar to imports
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const weather = require('./data/weather.json');
// const { request, response } = require('express');

// instance express server
const app = express();

//middleware
app.use(cors());

// set PORT variable
const PORT = process.env.PORT || 3002;

// home route/endpoint - always (/)
app.get('/', (request, response) => {
  response.send('testing endpoint');
});

// endpoint weather data
app.get('/weather', (req, res) => {
  const searchQuery = req.query.searchQuery;
  console.log('query params: ', req.query);
  console.log('query: ', searchQuery);

  // const citySearch = weather.find(city => city.city_name === searchQuery)

  res.send('weather coming soon...');
});

// listen on PORT/always last line of code
app.listen(PORT, console.log(`listening on PORT ${PORT}`));
