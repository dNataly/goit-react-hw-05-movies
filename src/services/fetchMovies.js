const BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = "1e1d4e13b76e9f56ba601bf1e8785fb3";

function fetchTrendingMovies() {
  return fetch(`${BASE_URL}trending/movie/day?api_key=${API_KEY}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(new Error("Nothind found"));
    })
    .then((response) => response.results);
}

function fetchMoviesById(filmId) {
  return fetch(`${BASE_URL}movie/${filmId}?api_key=${API_KEY}`).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error("Nothind found"));
  });
}

function fetchMoviesByActors(filmId) {
  return fetch(`${BASE_URL}movie/${filmId}/credits?api_key=${API_KEY}`).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error("Nothing found"));
  });
}

function fetchMoviesByReviews(filmId) {
  return fetch(`${BASE_URL}movie/${filmId}/reviews?api_key=${API_KEY}`).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error("Nothing found"));
  });
}

function fetchMoviesByKeyword(keyword) {
  return fetch(`${BASE_URL}search/movie?api_key=${API_KEY}&query=${keyword}`)
    .then((response) => response.json())
    .then((resp) => resp.results);
}

export { fetchMoviesByActors, fetchMoviesById, fetchMoviesByKeyword, fetchTrendingMovies, fetchMoviesByReviews, API_KEY };
