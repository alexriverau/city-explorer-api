'use strict';

const axios = require('axios');
let cache = require('./cache.js');

function getMovies(searchQuery) {
  const key = 'movies-' + searchQuery;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;

  if (cache[key]) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].data = axios
      .get(url)
      .then((response) => parseMovies(response.data));
  }

  return cache[key].data;
}

function parseMovies(moviesData) {
  try {
    const moviesSummaries = moviesData.results.map((movie) => {
      return new Movie(movie);
    });
    return Promise.resolve(moviesSummaries);
  } catch (e) {
    return Promise.reject(e);
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

module.exports = getMovies;
