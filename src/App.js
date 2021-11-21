import { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import AppBar from "./components/AppBar/AppBar";
import Container from "./components/Container/Container";
import Spinner from "./components/Spinner/Spinner";

const HomePage = lazy(() => import("./pages/HomePage"));

const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage"));

const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const MoviesPage = lazy(() => import("./pages/MoviesPage"));

export default function App() {
  return (
    <Container>
      <AppBar>
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
      </AppBar>
    </Container>
  );
}
