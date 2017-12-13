import isEmpty from 'lodash/isEmpty';
import types from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {},
  successMessage: '',
  error: '',
};

/**
 * authentication Reducer
 * @param {object} state
 * @param {object} action
 *
 * @returns {object} - user state
 */
const authenticationReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case types.CREATE_USER:
    return {
      ...state,
      isAuthenticated: !isEmpty(action.user),
      user: action.user,
      successMessage: action.successMessage,
    };
  case types.CREATE_USER_FAILURE:
    return {
      ...state,
      isAuthenticated: false,
      error: action.failureMessage,
    };
  case types.SET_CURRENT_USER:
    return {
      ...state,
      isAuthenticated: !isEmpty(action.user),
      user: action.user,
    };
  case types.SET_CURRENT_USER_FAILURE:
    return {
      ...state,
      isAuthenticated: false,
      error: action.failureMessage,
    };
  case types.LOGIN_USER:
    return {
      ...state,
      isAuthenticated: !isEmpty(action.user),
      user: action.user,
      successMessage: action.successMessage,
    };
  case types.LOGIN_USER_FAILURE:
    return {
      ...state,
      isAuthenticated: false,
      error: action.failureMessage,
    };
  default:
    return state;
  }
};

export default authenticationReducer;
