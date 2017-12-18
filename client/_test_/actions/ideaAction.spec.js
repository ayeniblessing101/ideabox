/* global jest */
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import expect from 'expect';
import thunk from 'redux-thunk';
import * as actions from '../../actions/ideaAction';
import types from '../../actions/types';
import ideas from '../../../server/tests/mockData/ideas.json';

const middlewares = [thunk];

describe('Idea Action', () => {
  it('should create an action to create a new idea', () => {
    const idea = ideas[0];
    const successMessage = 'Successful';

    const expectedAction = {
      type: types.CREATE_IDEA,
      idea,
      successMessage,
    };
    expect(actions.createIdea(idea, successMessage)).toEqual(expectedAction);
  });

  it('should create an action for failure when creating a new idea', () => {
    const failureMessage = { error: {} };

    const expectedAction = {
      type: types.CREATE_IDEA_FAILURE,
      failureMessage,
    };
    expect(actions.createIdeaFailure(failureMessage)).toEqual(expectedAction);
  });

  it('should create an action to fetch all ideas', () => {
    const expectedAction = {
      type: types.FETCH_IDEAS,
      ideas,
    };
    expect(actions.getIdeas(ideas)).toEqual(expectedAction);
  });

  it('should create an action for failure when getting all ideas', () => {
    const failureMessage = { error: {} };

    const expectedAction = {
      type: types.FETCH_IDEAS_FAILURE,
      failureMessage,
    };
    expect(actions.getIdeasFailure(failureMessage)).toEqual(expectedAction);
  });

  it('should create an action to get ideas by a user', () => {
    const myIdeas = ideas[1];
    const successMessage = 'Successful';

    const expectedAction = {
      type: types.FETCH_IDEAS_BY_USER,
      myIdeas,
      successMessage,
    };
    expect(actions.getIdeasByAUser(myIdeas, successMessage)).toEqual(expectedAction, );
  });
});
