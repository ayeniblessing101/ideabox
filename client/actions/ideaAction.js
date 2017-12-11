import axios from 'axios';
import types from './types';

/**
 * CreateIdea Action
 * @param {object} idea
 * @param {string} successMessage
 *
 * @returns {object} - action type and payload
 */
export const createIdea = (idea, successMessage) => {
  return {
    type: types.CREATE_IDEA,
    idea,
    successMessage,
  };
};

export const createIdeaFailure = (failureMessage) => {
  return {
    type: types.CREATE_IDEA_FAILURE,
    failureMessage,
  };
};

export const createAnIdea = (idea) => {
  return (dispatch) => {
    return axios.post('/api/v1/idea', idea).then(
      (response) => {
        dispatch(createIdea(response.data.newIdea, response.data.message));
        Materialize.toast(`${response.data.message}`, 5000, 'green');
        return true;
      },
      (error) => {
        dispatch(createIdeaFailure(error.response.data.error));
        Materialize.toast(`${error.response.data.error}`, 5000, 'red');
        return false;
      },
    );
  };
};
