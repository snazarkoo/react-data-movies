import * as types from '../actions/actionTypes';

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) == '_SUCCESS';
}

export default function ajaxStatusReducer(state = 0, action) {
  if (action.type == types.BEGIN_AJAX_CALL) {
    return state + 1;
  } else if (action.type == types.AJAX_CALL_ERROR ||
    actionTypeEndsInSuccess(action.type)) {
    if (action.type == types.LOAD_DISCOVERED_MOVIES_SUCCESS ||
        action.type == types.LOAD_MOVIE_SUCCESS)
    return state - 1;
  }
  return state;
}
