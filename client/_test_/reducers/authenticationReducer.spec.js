import expect from 'expect';
import types from '../../actions/types';
import authenticationReducer from '../../reducers/authenticationReducer';

const initialState = {
  isAuthenticated: false,
  user: {},
  successMessage: '',
  error: '',
};

describe('Authentication Reducer', () => {
  it('should create a new user', () => {
    const action = {
      type: types.CREATE_USER,
      user: {},
      successMessage: '',
    };
    const newState = authenticationReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      user: action.user,
    });
  });
  it('should log a user in', () => {
    const action = {
      type: types.LOGIN_USER,
      user: {},
      successMessage: '',
    };
    const newState = authenticationReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      user: action.user,
    });
  });
  it('should set current user', () => {
    const action = {
      type: types.SET_CURRENT_USER,
      user: {},
    };
    const newState = authenticationReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      ...{ user: {}, isAuthenticated: true },
    });
  });
});
