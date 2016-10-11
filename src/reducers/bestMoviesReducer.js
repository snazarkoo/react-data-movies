import * as types from '../actions/actionTypes';

export default function loadBestMoviesReducer(state = [], action) {
  switch (action.type) {

    case types.LOAD_BEST_MOVIES_SUCCESS:
      return action.bestMovies;

    default:
      return state;
  }
}