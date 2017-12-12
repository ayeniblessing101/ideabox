import types from '../actions/types';

const initialState = {
  idea: {},
  ideas: [],
  myIdeas: [],
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
  case types.FETCH_IDEAS:
    return {
      ...state,
      ideas: action.ideas,
    };
  case types.FETCH_IDEAS_FAILURE:
    return {
      ...state,
      error: action.failureMessage,
    };
  case types.FETCH_IDEAS_BY_USER:
    return {
      ...state,
      myIdeas: action.myIdeas,
    };
  case types.FETCH_IDEAS_BY_USER_FAILURE:
    return {
      ...state,
      error: action.failureMessage,
    };
  default:
    return state;
  }
};

export default ideaReducer;
