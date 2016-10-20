import * as types from '../constants/actionTypesConst';

export default function loadCommentsReducer(state = [], action) {
  switch (action.type) {

    case types.LOAD_COMMENTS_SUCCESS:
      return action.comments;

    case types.CREATE_COMMENT_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.comment)
      ];

    default:
      return state;
  }
}