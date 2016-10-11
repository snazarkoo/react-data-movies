import * as types from './actionTypes';
import * as api from '../api/apiConst';
import {beginAjaxCall} from './ajaxStatusActions.js';

export function loadMoviesSuccess(movies) {
  return {type: types.LOAD_MOVIES_SUCCESS, movies};
}

export function loadMovieSuccess(movie) {
  return {type: types.LOAD_MOVIE_SUCCESS, movie};
}

export function loadBestMoviesSuccess(bestMovies) {
  return {type: types.LOAD_BEST_MOVIES_SUCCESS, bestMovies};
}

export function loadDiscoveredMoviesSuccess(discoveredMovies) {
  return {type: types.LOAD_DISCOVERED_MOVIES_SUCCESS, discoveredMovies};
}

export function loadMovies(filmTilte) {
  return function(dispatch) {
    return $.ajax({
      url: `${api.BASE_URL}${api.URL_SEARCH_MOVIE}`,
      type: 'get',
      data: {
        api_key: api.API_KEY,
        query: filmTilte,
        language: 'en-US'
      },
      success: function(data) {
        let movies = data;
        dispatch(loadMoviesSuccess(movies));
      },
      error: function(error) {
        console.warn(error);
      }
    });
  };
}

export function loadDiscoveredMovies(year=2016, page=1) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return $.ajax({
      url: `${api.BASE_URL}${api.URL_DISCOVER_MOVIE}`,
      type: 'get',
      data: {
        api_key: api.API_KEY,
        language: 'en-US',
        year,
        page
      },
      success: function(data) {
        let discoveredMovies = data;
        dispatch(loadDiscoveredMoviesSuccess(discoveredMovies));
      },
      error: function(error) {
        console.warn(error);
      }
    });
  };
}

export function loadBestMovies() {
  return function(dispatch) {
    return $.ajax({
      url: `${api.BASE_URL}${api.URL_DISCOVER_MOVIE}`,
      type: 'get',
      data: {
        api_key: api.API_KEY,
        primary_release_year: '2016',
        sort_by: 'vote_average.desc'
      },
      success: function(data) {
        let bestMovies = data.results;
        dispatch(loadBestMoviesSuccess(bestMovies));
      },
      error: function(error) {
        console.warn(error);
      }
    });
  };
}

export function loadMovie(movieId) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return $.ajax(`https:////api.themoviedb.org/3/movie/${movieId}?api_key=54abcaff808fc3d0354601f6f513f7ba`).then(data => {
      dispatch(loadMovieSuccess(data));
    }).fail(error => {
      console.log(error);
    });
  };
}