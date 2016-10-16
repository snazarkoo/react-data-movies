import * as types from './actionTypes';
import * as api from '../api/apiConst';
import {beginAjaxCall} from './ajaxStatusActions.js';

export function loadCommentsSuccess(comments) {
  return {type: types.LOAD_COMMENTS_SUCCESS, comments};
}

export function loadComments(movieId) {
  return function(dispatch) {
    // dispatch(beginAjaxCall());
    return $.ajax({
      url: `http:////localhost:8000/movie/${movieId}/comments`,
      type: 'get',
      success: function(data) {
        let comments = data;
        dispatch(loadCommentsSuccess(comments));
      },
      error: function(error) {
        console.warn(error);
      }
    });
  };
}