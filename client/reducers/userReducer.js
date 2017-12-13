import types from '../actions/types';

const initialState = {
  user: {
    firstname: '',
    lastname: '',
    email: '',
  },
  successMessage: '',
};

const userReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case types.GET_USER:
    return {
      ...state,
      user: action.user,
    };
  case types.UPDATE_USER_PROFILE:
    return {
      ...state,
      user: action.user,
      successMessage: action.successMessage,
    };
  case types.UPDATE_USER_PROFILE_FAILURE:
    return {
      ...state,
      error: action.failureMessage,
    };
  default:
    return state;
  }
};

export default userReducer;
