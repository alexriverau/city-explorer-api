'use strict';

const axios = require('axios');

async function getMovies(searchQuery) {
  // const city = req.query.searchQuery;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;

  try {
    const moviesRes = await axios.get(url);
    const moviesArr = moviesRes.data.results.map((movie) => new Movie(movie));
    // res.status(200).send(moviesArr);
    return Promise.resolve(moviesArr);
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
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
