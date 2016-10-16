import * as types from '../actions/actionTypes';

export default function loadCommentsReducer(state = [], action) {
  switch (action.type) {

    case types.LOAD_COMMENTS_SUCCESS:
      return action.comments;

    default:
      return state;
  }
}