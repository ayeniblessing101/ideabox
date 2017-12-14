import axios from 'axios';
import types from './types';

/**
 * Aysnc Action to send reset token via email
 * @param {object} email
 *
 * @returns {object} - action type and payload
 */
export const requestPasswordChange = (email) => {
  return () => axios.post('/api/v1/resetpassword', email);
};
/**
 * resetPasswordAction action
 * @param {string} successMessage
 *
 * @returns {object} action type and payload
 */
export const resetPasswordAction = (successMessage) => {
  return {
    type: types.RESET_PASSWORD,
    successMessage,
  };
};

/**
 * resetPasswordFailure action
 * @param {string} failureMessage
 *
 * @returns {object} action type and payload
 */
export const resetPasswordFailure = (failureMessage) => {
  return {
    type: types.RESET_PASSWORD_FAILURE,
    failureMessage,
  };
};

/**
 * Aysnc Action to reset password
 * @param {string} token,
 * @param {object} passwordPayload,
 *
 * @returns {object} - true or false
 */
export const resetPassword = (token, passwordPayload) => {
  return (dispatch) => {
    return axios
      .put(`/api/v1/resetpassword?token=${token}`, passwordPayload)
      .then(
        (response) => {
          dispatch(resetPasswordAction(response.data.message));
          return true;
        },
        (error) => {
          dispatch(resetPasswordFailure(error.response.data.error));
          return false;
        },
      );
  };
};
