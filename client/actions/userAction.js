import axios from 'axios';
import types from './types';

/**
 * getUser Action
 * @param {object} user
 *
 * @returns {object} - action type and payload
 */
export const getUser = (user) => {
  return {
    type: types.GET_USER,
    user,
  };
};

/**
 * getUserFailure action
 * @param {object} failureMessage
 *
 * @returns {object} - action type and payload
 */
export const getUserFailure = (failureMessage) => {
  return {
    type: types.GET_USER_FAILURE,
    failureMessage,
  };
};

/**
 * updateUser Action
 * @param {object} user
 *
 * @returns {object} - action type and payload
 */
export const updateUserProfile = (user) => {
  return {
    type: types.UPDATE_USER_PROFILE,
    user,
  };
};

/**
 * updateUserFailure Action
 * @param {object} failureMessage
 *
 * @returns {object} - action type and payload
 */
export const updateUserProfileFailure = (failureMessage) => {
  return {
    type: types.UPDATE_USER_PROFILE_FAILURE,
    failureMessage,
  };
};

/**
 * Async action creator to get a user
 * @param {object} idea
 * @returns {function} - dispatch
 */
export const getAUser = () => {
  return (dispatch) => {
    axios.get('/api/v1/user').then(
      (response) => {
        dispatch(getUser(response.data.user));
        return true;
      },
      (error) => {
        dispatch(getUserFailure(error.response.data.message));
        return false;
      },
    );
  };
};

/**
 * Async action creator to update a user profile
 * @param {object} user
 * @returns {function} - dispatch
 */
export const updateAUserProfile = (user) => {
  return (dispatch) => {
    axios.put('/api/v1/user', user).then(
      (response) => {
        dispatch(updateUserProfile(response.data.user));
        Materialize.toast(`${response.data.message}`, 5000, 'green');
        return true;
      },
      (error) => {
        dispatch(updateUserProfileFailure(error.response.data.message));
        Materialize.toast(`${error.response.data.message}`, 5000, 'red');
        return false;
      },
    );
  };
};
