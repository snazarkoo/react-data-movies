import * as types from '../constants/actionTypesConst';
import * as api from '../constants/urlConst';
import toastr from 'toastr';
toastr.options.positionClass = 'toast-bottom-right';

function requestAuth(creds) {
  return {
    type: types.AUTH_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds: Object.assign({}, creds)
  };
}

function receiveAuth(user) {
  const {
    id_token,
    username,
    userId
  } = user;
  return {
    type: types.AUTH_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token,
    username,
    userId
  };
}

function authError(message) {
  return {
    type: types.AUTH_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  };
}

function requestLogout() {
  return {
    type: types.LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  };
}

function receiveLogout() {
  return {
    type: types.LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  };
}

// Calls the API to get a token and
// dispatches actions along the way
export function loginUser(creds) {
  let config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `username=${creds.username}&password=${creds.password}`
  };

  return dispatch => {
    // We dispatch requestAuth to kickoff the call to the API
    dispatch(requestAuth(creds));
    return fetch('/v1/authenticate', config)
      .then(response =>
        response.json()
        .then(user => ({
          user,
          response
        }))
      ).then(({
        user,
        response
      }) => {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          toastr.error(user.message);
          dispatch(authError(user.message));
          return Promise.reject(user);
        } else {
          // If login was successful, set the token in local storage
          localStorage.setItem('user', JSON.stringify(user));

          // Dispatch the success action
          dispatch(receiveAuth(user));
        }
      }).catch(err => {
        console.error("Error: ", err);
      });
  };
}

// Logs the user out
export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout());
    localStorage.removeItem('user');
    dispatch(receiveLogout());
  };
}

// Calls the API to get a token and
// dispatches actions along the way
export function signUpUser(creds) {
  let config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `username=${creds.username}&password=${creds.password}`
  };

  return dispatch => {
    dispatch(requestAuth(creds));
    return fetch('/v1/signup', config)
      .then(response =>
        response.json()
        .then(user => ({
          user,
          response
        }))
      ).then(({
        user,
        response
      }) => {
        if (!response.ok) {
          toastr.error(user.message);
          dispatch(authError(user.message));
          return Promise.reject(user);
        } else {
          toastr.success("User created");
          localStorage.setItem('user', JSON.stringify(user));
          dispatch(receiveAuth(user));
        }
      }).catch(err => {
        console.error("Error: ", err);
      });
  };
}