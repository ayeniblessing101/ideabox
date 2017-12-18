import types from '../actions/types';

const initialState = {
  ideas: [],
  error: ''
};

const filterIdeasReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case types.FILTER_IDEAS:
    return {
      ...state,
      ideas: action.ideas,
    };
  case types.FILTER_IDEAS_FAILURE:
    return {
      ...state,
      error: action.failureMessage,
    };
  default:
    return state;
  }
};
export default filterIdeasReducer;
