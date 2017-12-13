import types from '../actions/types';

const initialState = {
  newIdea: {},
  ideas: [],
  myIdeas: [],
  idea: {
    title: '',
    ideaType: '',
    category: '',
    description: '',
  },
  successMessage: '',
  newIdeaSuccessMessage: '',
  newIdeaerrorMessage: '',
  error: '',
};

const ideaReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case types.CREATE_IDEA:
    return {
      ...state,
      newIdea: action.idea,
      newIdeaSuccessMessage: action.successMessage,
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
  case types.FETCH_IDEA:
    return {
      ...state,
      idea: action.idea,
    };
  case types.FETCH_IDEA_FAILURE:
    return {
      ...state,
      error: action.failureMessage,
    };
  case types.UPDATE_IDEA:
    return {
      ...state,
      idea: action.idea,
    };
  case types.UPDATE_IDEA_FAILURE:
    return {
      ...state,
      error: action.failureMessage,
    };
  case types.DELETE_IDEA:
    return {
      ...state,
      successMessage: action.successMessage,
    };
  case types.DELETE_IDEA_FAILURE:
    return {
      ...state,
      error: action.failureMessage,
    };
  default:
    return state;
  }
};

export default ideaReducer;
