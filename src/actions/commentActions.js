import * as types from '../constants/actionTypesConst';
import * as api from '../constants/urlConst';
import toastr from 'toastr';
toastr.options.positionClass = 'toast-bottom-right';

export function loadCommentsSuccess(comments) {
  return {type: types.LOAD_COMMENTS_SUCCESS, comments};
}

export function createCommentSuccess(comment) {
  return {type: types.CREATE_COMMENT_SUCCESS, comment};
}

export function loadComments(movieId) {
  return function(dispatch) {
    return $.ajax({
      url: `/v1/movie/${movieId}/comments`,
      type: 'get',
      success: function(data) {
        let comments = data;
        dispatch(loadCommentsSuccess(comments));
      },
      error: function(error) {
        toastr.error(error);
      }
    });
  };
}

export function createComment(movieId, commentConf={}) {
  const user = JSON.parse(localStorage.getItem('user'));
  delete user.id_token;
  commentConf.user = user;
  return function(dispatch) {
    return $.ajax({
      url: `/v1/movie/${movieId}/comment`,
      type: 'post',
      data: JSON.stringify(commentConf),
      contentType: "application/json",
      success: function(data) {
        let comment = data;
        dispatch(createCommentSuccess(comment));
      },
      error: function(error) {
        toastr.error(error);
      }
    });
  };
}