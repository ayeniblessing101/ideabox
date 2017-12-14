import types from '../actions/types';

const initialState = {
  successMessage: '',
  error: '',
};

/**
 * resetPassword Reducer
 * @param {object} state
 * @param {object} action
 *
 * @returns {object}
 */

const resetPasswordReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case types.RESET_PASSWORD:
    return {
      ...state,
      successMessage: action.successMessage,
    };
  case types.RESET_PASSWORD_FAILURE:
    return {
      ...state,
      error: action.failureMessage,
    };
  default:
    return state;
  }
};

export default resetPasswordReducer;
