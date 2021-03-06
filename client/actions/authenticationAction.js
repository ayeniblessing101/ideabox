import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import types from './types';

/**
 * createUser Action
 * @param {object} user
 * @param {string} successMessage
 *
 * @returns {object} - action type and payload
 */
export const createUser = (user, successMessage) => {
  return {
    type: types.CREATE_USER,
    user,
    successMessage,
  };
};

/**
 * createUserFailure action
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

export const loginUser = (user, successMessage) => {
  return {
    type: types.LOGIN_USER,
    user,
    successMessage,
  };
};

/**
 * loginUserFailure action
 * @param {object} failureMessage
 *
 * @returns {object} - action type and payload
 */
export const loginUserFailure = (failureMessage) => {
  return {
    type: types.LOGIN_USER_FAILURE,
    failureMessage,
  };
};

/**
 * Async action creator to create a new user
 * @param {object} user
 * @param {object} successMessage
 * @returns {function} - dispatch
 */
export const createNewUser = (user) => {
  return (dispatch) => {
    return axios.post('/api/v1/user/signup', user).then(
      (response) => {
        localStorage.setItem('jwtToken', response.data.token);
        setAuthorizationToken(response.data.token);
        dispatch(createUser(response.data.user, response.data.message));
        dispatch(setCurrentUser(jwt.decode(response.data.token)));
        return true;
      },
      (error) => {
        dispatch(createUserFailure(error.response.data.error));
        return false;
      },
    );
  };
};

/**
 * Async action creator to login a user
 * @param {object} user
 * @returns {function} - dispatch
 */
export const loginAUser = (user) => {
  return (dispatch) => {
    return axios.post('/api/v1/user/login', user).then(
      (response) => {
        localStorage.setItem('jwtToken', response.data.token);
        setAuthorizationToken(response.data.token);
        dispatch(loginUser(response.data.user, response.data.message));
        dispatch(setCurrentUser(jwt.decode(response.data.token)));
        return true;
      },
      (error) => {
        dispatch(loginUserFailure(error.response.data.error));
        return false;
      },
    );
  };
};

/**
 * Async action to logout a user
 *
 * @returns {function} - dispatch
 */
export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser(jwt.decode({})));
  };
};
