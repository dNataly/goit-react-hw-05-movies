import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as API from "../services/fetchMovies";

export default function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);

  useEffect(() => {
    API.fetchMoviesByActors(movieId).then(setCast);
  }, [movieId]);

  return (
    <>
      {cast && (
        <ul>
          {cast.cast.map((el) => (
            <li key={el.id}>
              <img className="actor-img" src={el.profile.path ? `https://image.tmdb.org/t/p/w300${el.profile_path}?api_key=${API.API_KEY}` : null} alt="{el.name}" />
              <p className="actor-name">Name: {el.name}</p>
              <p>Character: {el.character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
