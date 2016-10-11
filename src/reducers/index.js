import {combineReducers} from 'redux';
import movies from './moviesReducer';
import movie from './movieReducer';
import bestMovies from './bestMoviesReducer';
import discoveredMovies from './discoveredMoviesReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  movies,
  movie,
  ajaxCallsInProgress,
  discoveredMovies,
  bestMovies
});

export default rootReducer;