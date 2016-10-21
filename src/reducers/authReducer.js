import * as types from '../constants/actionTypesConst';
const user = JSON.parse(localStorage.getItem('user'));

export default function auth(state = {
    isFetching: false,
    isAuthenticated: user && user.id_token ? true : false
  }, action) {
  switch (action.type) {
    case types.AUTH_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.creds
      })
    case types.AUTH_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
      })
    case types.AUTH_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      })
    case types.LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      })
    default:
      return state
    }
}