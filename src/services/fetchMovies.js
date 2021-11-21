const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '1e1d4e13b76e9f56ba601bf1e8785fb3';

function fetchTrendingMovie() {
  return fetch(`${BASE_URL}trending/movie/day?api_key=${API_KEY}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(
        new Error(`No movie are available on this request`),
      );
    })
    .then(response => response.results);
}

function fetchMovieById(filmId) {
  return fetch(`${BASE_URL}movie/${filmId}?api_key=${API_KEY}`).then(
    response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(
        new Error('No movie are available on this request'),
      );
    },
  );
}

function fetchMovieByActors(filmId) {
  return fetch(`${BASE_URL}movie/${filmId}/credits?api_key=${API_KEY}`).then(
    response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(
        new Error('No movie are available on this request'),
      );
    },
  );
}

function fetchMovieByReviews(filmId) {
  return fetch(`${BASE_URL}movie/${filmId}/reviews?api_key=${API_KEY}`).then(
    response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(
        new Error('No movie are available on this request'),
      );
    },
  );
}

function fetchMovieByKeyword(keyword) {
  return fetch(`${BASE_URL}search/movie?api_key=${API_KEY}&query=${keyword}`)
    .then(response => response.json())
    .then(resp => resp.results);
}

export {
  fetchMovieByKeyword,
  fetchMovieById,
  fetchTrendingMovie,
  fetchMovieByActors,
  fetchMovieByReviews,
  API_KEY,
};
