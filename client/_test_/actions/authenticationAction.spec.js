/* global jest */
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import expect from 'expect';
import thunk from 'redux-thunk';
import * as actions from '../../actions/authenticationAction';
import types from '../../actions/types';
import users from '../../../server/tests/mockData/users.json';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Authentication Action', () => {
  it('should create an action to create a new user', () => {
    const user = users[0];
    const successMessage = 'Successful';

    const expectedAction = {
      type: types.CREATE_USER,
      user,
      successMessage,
    };
    expect(actions.createUser(user, successMessage)).toEqual(expectedAction);
  });

  it('should create an action for failure when creating a new user', () => {
    const failureMessage = { error: {} };

    const expectedAction = {
      type: types.CREATE_USER_FAILURE,
      failureMessage,
    };
    expect(actions.createUserFailure(failureMessage)).toEqual(expectedAction);
  });

  it('should create an action to login a user', () => {
    const user = users[1];
    const successMessage = '';
    const expectedAction = {
      type: types.LOGIN_USER,
      user,
      successMessage,
    };
    expect(actions.loginUser(user, successMessage)).toEqual(expectedAction);
  });

  it('should create an action for failure when loging in a user', () => {
    const failureMessage = { error: {} };
    const expectedAction = {
      type: types.LOGIN_USER_FAILURE,
      failureMessage,
    };
    expect(actions.loginUserFailure(failureMessage)).toEqual(expectedAction);
  });

  it('should create an action to set current user', () => {
    const user = users[1];
    const expectedAction = {
      type: types.SET_CURRENT_USER,
      user,
    };
    expect(actions.setCurrentUser(user)).toEqual(expectedAction);
  });

  it('should create an action for failure when setting current user', () => {
    const failureMessage = { error: {} };
    const expectedAction = {
      type: types.SET_CURRENT_USER_FAILURE,
      failureMessage,
    };
    expect(actions.setCurrentUserFailure(failureMessage)).toEqual(expectedAction, );
  });
});

describe('Authentication Async Action', () => {
  it('should dispatch create user actions on success', () => {
    axios.post = jest.fn(() => {
      return Promise.resolve({
        data: {
          user: {},
          massage: '',
        },
      });
    });
    const data = users[0];
    const store = mockStore({});
    const expectedActions = [
      { successMessage: undefined, type: 'CREATE_USER', user: {} },
      { type: 'SET_CURRENT_USER', user: null },
    ];
    return store.dispatch(actions.createNewUser(data)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch login actions ', () => {
    axios.post = jest.fn(() => {
      return Promise.resolve({
        data: {
          user: {},
        },
      });
    });
    const data = users[1];
    const store = mockStore({});
    const expectedActions = [
      { successMessage: undefined, type: 'LOGIN_USER', user: {} },
      { type: 'SET_CURRENT_USER', user: null },
    ];
    return store.dispatch(actions.loginAUser(data)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
