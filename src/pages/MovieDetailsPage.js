import { useState, useEffect } from 'react';
import {
  useParams,
  Link,
  useRouteMatch,
  Route,
  Switch,
  useLocation,
  useHistory,
} from 'react-router-dom';
import * as APP from '../services/fetchMovies';
import Cast from './Cast';
import Reviews from './Reviews';
import ButtonBack from '../components/ButtonBack/ButtonBack';
import MovieCard from '../components/MovieCard/MovieCard';
import Spinner from '../components/Spinner/Spinner';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function MovieDetailsPage() {
  const location = useLocation();
  const history = useHistory();
  const { url } = useRouteMatch();
  const { movieId } = useParams();
  const [moviePage, setMoviePage] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    setStatus(Status.PENDING);
    APP.fetchMovieById(movieId)
      .then(setMoviePage)
      .catch(() => setStatus(Status.REJECTED))
      .finally(() => setStatus(Status.IDLE));
  }, [movieId]);

  const onGoBack = () => {
    setStatus(Status.PENDING);
    history.push(location?.state?.from.location ?? '/');
  };

  return (
    <>
      <ButtonBack onClick={onGoBack}>{'← Go back'}</ButtonBack>

      {status === Status.PENDING && <Spinner />}

      {moviePage && (
        <>
          <MovieCard movies={moviePage} />

          <hr />
          <p className="info__title">Additional information</p>
          <ul className="movie__info--item">
              <li>
            <Link
              className="movie__info--list"
              to={{
                pathname: `${url}/cast`,
                state: {
                  from: location?.state?.from ?? '/',
                  label: 'Back to the selected movie',
                },
              }}
            >
               Cast
            </Link>
              </li>
    <li>
            <Link
              className="movie__info--list"
              to={{
                pathname: `${url}/reviews`,
                state: {
                  from: location?.state?.from ?? '/',
                },
              }}
            >
               Reviews
            </Link>
    </li>
          </ul>
          <hr />
          <Switch>
            <Route exact path="/movies/:movieId/cast">
              <Cast />
            </Route>

            <Route path="/movies/:movieId/reviews">
              <div className="reviews__text">
                <Reviews />
              </div>
            </Route>
          </Switch>
        </>
      )}
    </>
  );
}
