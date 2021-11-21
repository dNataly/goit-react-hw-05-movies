import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as API from "../services/fetchMovies";

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    API.fetchMoviesByReviews(movieId).then(setReviews);
  }, [movieId]);

  return (
    <>
      {reviews && reviews.results[0] ? (
        <ul>
          {reviews.results.map((result) => (
            <li key={result.id}>
              <h4>Author: {result.author}</h4>
              <p>{result.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        `We don't have any reviews for this movie.`
      )}
    </>
  );
}
