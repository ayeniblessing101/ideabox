import types from '../actions/types';

const initialState = {
  idea: {},
};

const ideaReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case types.CREATE_IDEA:
    return {
      ...state,
      idea: action.idea,
    };
  case types.CREATE_IDEA_FAILURE:
    return {
      ...state,
      error: action.failureMessage,
    };
  default:
    return state;
  }
};

export default ideaReducer;
