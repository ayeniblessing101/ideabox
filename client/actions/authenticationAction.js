import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import types from './types';

/**
 * createUserSuccess Action
 * @param {string} successMessage
 * @param {object} user
 *
 * @returns {object} - action type and payload
 */
export const createUser = (successMessage, user) => {
  return {
    type: types.CREATE_USER,
    user,
    successMessage,
  };
};

/**
 *
 * @param {object} failureMessage
 *
 * @returns {object} - action type and payload
 */
export const createUserFailure = (failureMessage) => {
  return {
    type: types.CREATE_USER_FAILURE,
    failureMessage,
  };
};

/**
 * setCurrentUser Action
 * @param {user} user
 *
 * @returns {object} - action type and payload
 */
export const setCurrentUser = (user) => {
  return {
    type: types.SET_CURRENT_USER,
    user,
  };
};

/**
 * setCurrentUserFailure Action
 * @param {string} failureMessage
 *
 * @returns {object} - action type and payload
 */
export const setCurrentUserFailure = (failureMessage) => {
  return {
    type: types.SET_CURRENT_USER_FAILURE,
    failureMessage,
  };
};

export const loginUser = (user) => {
  return {
    type: types.LOGIN_USER,
    user,
  };
};

/**
 * Async action creator to create a new user
 * @param {object} user
 * @returns {function} - dispatch
 */
export const createNewUser = (user) => {
  return (dispatch) => {
    return axios.post('/api/v1/user/signup', user).then(
      (response) => {
        localStorage.setItem('jwtToken', response.data.token);
        setAuthorizationToken(response.data.token);
        dispatch(createUser(response.data.message, response.data.user));
        Materialize.toast(`${response.data.message}`, '5000', 'green');
        dispatch(setCurrentUser(jwt.decode(response.data.token)));
        return true;
      },
      (error) => {
        dispatch(createUserFailure(error.response.data.error));
        Materialize.toast(`${error.response.data.error}`, '5000', 'red');
        return false;
      },
    );
  };
};
