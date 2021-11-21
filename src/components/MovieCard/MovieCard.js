import * as API from "../../services/fetchMovies";

export default function MovieCard({ movies }) {
  return (
    <div className="card-wrap">
      <img className="movie-img" src={`https://image.tmdb.org/t/p/w300${movies.poster_path}?api_key=${API.API_KEY}`} alt={movies.original_title} />
      <div className="movie-desc">
        <h2 className="movie-title">{movies.original.title}</h2>
        <p>User Score: {movies.vote_average}</p>
        <h3>Overview:</h3>
        <p>{movies.overview}</p>
        <h3>Genres:</h3>
        <ul className="movie__list">
          {movies.genres.map((genre) => (
            <li key="{genre.id}" className="movie-item">
              {genre.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
