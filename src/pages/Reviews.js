import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as APP from '../services/fetchMovies';

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    APP.fetchMovieByReviews(movieId).then(setReviews);
  }, [movieId]);

  // console.log(reviews);

  return (
    <>
      {reviews && reviews.results[0] ? (
        <ul>
          {reviews.results.map(result => (
            <li key={result.id}>
              <h4>Autor: {result.author}</h4>
              <p className="info__title">{result.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        `We don't have any reviews for this movie.`
      )}
    </>
  );
}
