import expect from 'expect';
import types from '../../actions/types';
import userReducer from '../../reducers/userReducer';

const initialState = {
  user: {
    firstname: '',
    lastname: '',
    email: '',
  },
  successMessage: '',
  error: '',
};

describe('User Reducer', () => {
  it('should get a user', () => {
    const action = {
      type: types.GET_USER,
      user: {},
      successMessage: '',
    };
    const newState = userReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      ...{ user: {}, successMessage: '' },
    });
  });

  it('should update user profile', () => {
    const action = {
      type: types.UPDATE_USER_PROFILE,
      user: {},
      successMessage: '',
    };
    const newState = userReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      ...{ user: {}, successMessage: '' },
    });
  });

  it('should handle error when user profile update fails', () => {
    const action = {
      type: types.UPDATE_USER_PROFILE_FAILURE,
      failureMessage: '',
    };
    const newState = userReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      ...{ error: '', successMessage: '' },
    });
  });
});
