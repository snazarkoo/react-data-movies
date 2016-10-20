import * as types from '../constants/actionTypesConst';

export default function courseReducer(state = {}, action) {
  switch (action.type) {

    case types.LOAD_MOVIE_SUCCESS:
      return action.movie;

    default:
      return state;
  }
}