import * as APP from '../../services/fetchMovies';
import PropTypes from 'prop-types';

export default function MovieCard({ movies }) {
  return (
    <div className="container__card">
      <div>
        <img
          className="movie__img"
          src={`https://image.tmdb.org/t/p/w300${movies.poster_path}?api_key=${APP.API_KEY}`}
          alt={movies.original_title}
        />
      </div>
      <div className="movie__description">
        <h2 className="movie__title">{movies.original_title}</h2>
        <p className="movie__title">User Score: {movies.vote_average}</p>
        <h3 className="movie__title">Overview:</h3>
        <p className="movie__title">{movies.overview}</p>
        <h3 className="movie__title">Genres:</h3>
        <ul className="movie__item">
          {movies.genres.map(genre => (
            <li key={genre.id} className="movie__list">
              {genre.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

MovieCard.propTypes = {
  movies: PropTypes.object.isRequired,
};
