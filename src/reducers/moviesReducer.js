import * as types from '../constants/actionTypesConst';

export default function loadMoviesReducer(state = [], action) {
  switch (action.type) {

    case types.LOAD_MOVIES_SUCCESS:
      return action.movies;

    default:
      return state;
  }
}