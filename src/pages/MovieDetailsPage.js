import { useState, useEffect } from "react";
import { useParams, Link, useRouteMatch, Route, Switch, useLocation, useHistory } from "react-router-dom";
import * as API from "../services/fetchMovies";
// import Cast from "./Cast";
import Reviews from "./Reviews";
import ButtonBack from "../components/ButtonBack/ButtonBack";
import MovieCard from "../components/MovieCard/MovieCard";
import Spinner from "../components/Spinner/Spinner";
// import {ImUndo2} './../react-icons/im';

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
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
    API.fetchMoviesById(movieId)
      .then(setMoviePage)
      .catch(() => setStatus(Status.REJECTED))
      .finally(() => setStatus(Status.IDLE));
  }, [movieId]);

  const onGoBack = () => {
    setStatus(Status.PENDING);
    history.push(location?.state?.from.location ?? "/");
  };

  return (
    <>
      <ButtonBack onClick={onGoBack}>
        {/* <ImUndo2 /> */}
        {"Go back"}
      </ButtonBack>
      {status === Status.PENDING && <Spinner />}
      {moviePage && (
        <>
          <MovieCard movies={moviePage} />

          <p>Additional information</p>
          <ul>
            <Link to={{ pathname: `${url}/cast`, state: { from: location?.state?.from ?? "/", label: "Back to the selected movie" } }}>Cast</Link>
            <Link to={{ pathname: `${url}/reviews`, state: { from: location?.state?.from ?? "/" } }}>Reviews</Link>
          </ul>

          <Switch>
            <Route exact path="/movies/:movieId/cast">
              Cast
            </Route>

            <Route path="/movies/:movieId/reviews">
              <Reviews />
            </Route>
          </Switch>
        </>
      )}
    </>
  );
}
