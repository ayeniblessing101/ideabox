import expect from 'expect';
import types from '../../actions/types';
import filterIdeasReducer from '../../reducers/filterIdeasReducer';

const initialState = {
  ideas: [],
  error: '',
};

describe('Filter Ideas Reducer', () => {
  it('should filter ideas', () => {
    const action = {
      type: types.FILTER_IDEAS,
      ideas: [],
    };
    const newState = filterIdeasReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      ideas: action.ideas,
    });
  });
});
