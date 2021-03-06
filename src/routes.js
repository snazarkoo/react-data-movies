import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import DiscoverPage from './components/discover/DiscoverPage';
import MoviePage from './components/movie/MoviePage';
import MoviesPage from './components/movies/MoviesPage';
import NotFoundPage from './components/notFound/NotFoundPage';

export default (
  <Route>
    <Route path="/" component={App}>
      <IndexRoute component={DiscoverPage} />
      <Route path="movie/:id" component={MoviePage} />
      <Route path="movies" component={MoviesPage} />
    </Route>
    <Route path="*" component={NotFoundPage} />
  </Route>
);
