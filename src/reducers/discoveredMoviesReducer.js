import * as types from '../constants/actionTypesConst';

export default function discoveredMoviesReducer(state = [], action) {
  switch (action.type) {

    case types.LOAD_DISCOVERED_MOVIES_SUCCESS:
      return action.discoveredMovies;

    default:
      return state;
  }
}