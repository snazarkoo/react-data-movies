import * as types from '../constants/actionTypesConst';
import * as api from '../constants/urlConst';
import {beginAjaxCall} from './ajaxStatusActions.js';

export function loadCommentsSuccess(comments) {
  return {type: types.LOAD_COMMENTS_SUCCESS, comments};
}

export function createCommentSuccess(comment) {
  return {type: types.CREATE_COMMENT_SUCCESS, comment};
}

export function loadComments(movieId) {
  return function(dispatch) {
    return $.ajax({
      url: `${api.BASE_URL_CUSTOM}${movieId}/comments`,
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

export function createComment(movieId, commentConf) {
  return function(dispatch) {
    return $.ajax({
      url: `${api.BASE_URL_CUSTOM}${movieId}/comment`,
      type: 'post',
      data: JSON.stringify(commentConf),
      contentType: "application/json",
      success: function(data) {
        let comment = data;
        dispatch(createCommentSuccess(comment));
      },
      error: function(error) {
        console.warn(error);
      }
    });
  };
}