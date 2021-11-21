import { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import PageHeading from "../components/PageHeading/PageHeading";
import * as API from "../services/fetchMovies";
import Spinner from "../components/Spinner/Spinner";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

export default function HomePage() {
  const { url } = useRouteMatch();
  const [movie, setMovie] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    setStatus(Status.PENDING);
    API.fetchTrendingMovies()
      .then(setMovie)
      .catch(() => setStatus(Status.REJECTED))
      .finally(() => setStatus(Status.IDLE));
  }, []);

  return (
    <>
      <PageHeading title="Trending today" />
      {status === Status.PENDING && <Spinner />}
      <ul className="trending-today">
        {movie &&
          movie.map((movie) => (
            <li key={movie.id}>
              <Link to={`${url}movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
      </ul>
    </>
  );
}
