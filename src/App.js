import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';
import Container from './components/Container/Container';
import Spinner from './components/Spinner/Spinner';

const HomePage = lazy(() =>
  import('./pages/HomePage' /* webpackChunkName: "home_page" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    './pages/MovieDetailsPage' /* webpackChunkName: "movie_details_page" */
  ),
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage' /* webpackChunkName: "not_found_page" */),
);
const MoviesPage = lazy(() =>
  import('./pages/MoviesPage' /* webpackChunkName: "movies_page" */),
);

export default function App() {
  return (
      <>
      <AppBar />
    <Container>
    <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>

          <Route exact path="/movies">
            <MoviesPage />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>

          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </Suspense>
    </Container>
      </>
  );
}
