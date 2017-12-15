import axios from 'axios';
import types from './types';

/**
 * filterIdeas Action
 * @param {object} ideas
 *
 * @returns {object} - action type and payload
 */
export const filterIdeasAction = (ideas) => {
  return {
    type: types.FETCH_IDEAS,
    ideas,
  };
};

/**
 * filterIdeasFailure action
 * @param {object} failureMessage
 *
 * @returns {object} - action type and payload
 */
export const filterIdeasFailure = (failureMessage) => {
  return {
    type: types.FETCH_IDEAS_FAILURE,
    failureMessage,
  };
};

/**
 * Async action creator to filter ideas by category
 * @param {object} category
 *
 * @returns {function} - dispatch
 */
export const filterIdeas = ({ category }) => {
  return (dispatch) => {
    const categories = category.join(',');
    return axios.get(`api/v1/ideas?category=${categories}`).then(
      (response) => {
        dispatch(filterIdeasAction(response.data.ideas));
        return true;
      },
      (error) => {
        dispatch(filterIdeasFailure(error.response.data.error));
        return false;
      },
    );
  };
};
