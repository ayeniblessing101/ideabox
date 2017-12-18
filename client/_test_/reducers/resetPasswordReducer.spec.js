import expect from 'expect';
import types from '../../actions/types';
import resetPasswordReducer from '../../reducers/resetPasswordReducer';

const initialState = {
  successMessage: '',
  error: '',
};

describe('Reset Password Reducer', () => {
  it('should indicate when password reset is successful', () => {
    const action = {
      type: types.RESET_PASSWORD,
      successMessage: '',
    };
    const newState = resetPasswordReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      ...{ successMessage: '' },
    });
  });

  it('should handle error when password reset fails', () => {
    const action = {
      type: types.RESET_PASSWORD_FAILURE,
      failureMessage: '',
    };
    const newState = resetPasswordReducer(initialState, action);
    expect(newState).toEqual({
      ...initialState,
      ...{ error: '', successMessage: '' },
    });
  });
});
