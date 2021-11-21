import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import * as APP from '../services/fetchMovies';
import Searchbar from '../components/Searchbar/Searchbar';
import Spinner from '../components/Spinner/Spinner';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function MoviesPage() {
  const [keyword, setKeyword] = useState('');
  const [movies, setMovies] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const { url } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  const sortQuery = new URLSearchParams(location.search).get('query') ?? '';

  // console.log(sortQuery);

  useEffect(() => {
    if (!sortQuery) {
      return;
    }

    function moviesApiService() {
      setStatus(Status.PENDING);

      APP.fetchMovieByKeyword(sortQuery)
        .then(movie => {
          if (movie.length === 0) {
            setStatus(Status.REJECTED);
            toast.error(
              'Something went wrong! Please enter a correct request.',
            );
            return;
          }

          setMovies(movie);
          setStatus(Status.RESOLVED);
        })
        .catch(() => setStatus(Status.REJECTED));
    }

    moviesApiService();
  }, [sortQuery]);

  const handleFormSubmit = keyword => {
    setKeyword(keyword);

    history.push({
      ...location,
      search: `query=${keyword}`,
    });
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />

      {status === Status.PENDING && <Spinner />}

      <ul>
        {movies &&
          movies.map(movie => (
            <li key={movie.id} className="trending__today--movie">
              <Link
                to={{
                  pathname: `${url}/${movie.id}`,
                  state: {
                    from: { location },
                  },
                }}
              >
                {movie.title}
              </Link>
            </li>
          ))}
      </ul>
      <ToastContainer autoClose={3000} />
    </>
  );
}
