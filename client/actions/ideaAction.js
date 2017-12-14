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

/**
 * createIdeaFailure action
 * @param {object} failureMessage
 *
 * @returns {object} - action type and payload
 */
export const createIdeaFailure = (failureMessage) => {
  return {
    type: types.CREATE_IDEA_FAILURE,
    failureMessage,
  };
};

/**
 * getIdeas Action
 * @param {object} ideas
 *
 * @returns {object} - action type and payload
 */
export const getIdeas = (ideas) => {
  return {
    type: types.FETCH_IDEAS,
    ideas,
  };
};

/**
 * getIdeasFailure action
 * @param {object} failureMessage
 *
 * @returns {object} - action type and payload
 */
export const getIdeasFailure = (failureMessage) => {
  return {
    type: types.FETCH_IDEAS_FAILURE,
    failureMessage,
  };
};

/**
 * getIdeas Action
 * @param {object} myIdeas
 * @param {string} successMessage
 *
 * @returns {object} - action type and payload
 */
export const getIdeasByAUser = (myIdeas, successMessage) => {
  return {
    type: types.FETCH_IDEAS_BY_USER,
    myIdeas,
    successMessage,
  };
};

/**
 * getIdeasFailure action
 * @param {object} failureMessage
 *
 * @returns {object} - action type and payload
 */
export const getIdeasByAUserFailure = (failureMessage) => {
  return {
    type: types.FETCH_IDEAS_BY_USER_FAILURE,
    failureMessage,
  };
};

/**
 * getIdea Action
 * @param {object} idea
 *
 * @returns {object} - action type and payload
 */
export const getIdea = (idea) => {
  return {
    type: types.FETCH_IDEA,
    idea,
  };
};

/**
 * getIdeaFailure action
 * @param {object} failureMessage
 *
 * @returns {object} - action type and payload
 */
export const getIdeaFailure = (failureMessage) => {
  return {
    type: types.FETCH_IDEA_FAILURE,
    failureMessage,
  };
};

/**
 * updateidea Action
 * @param {object} idea
 *
 * @returns {object} - action type and payload
 */
export const updateIdea = (idea) => {
  return {
    type: types.UPDATE_IDEA,
    idea,
  };
};

/**
 * updateUserFailure Action
 * @param {object} failureMessage
 *
 * @returns {object} - action type and payload
 */
export const updateIdeaFailure = (failureMessage) => {
  return {
    type: types.UPDATE_IDEA_FAILURE,
    failureMessage,
  };
};
/**
 * deleteidea Action
 * @param {string} successMessage
 *
 * @returns {object} - action type and payload
 */
export const deleteIdea = (successMessage) => {
  return {
    type: types.DELETE_IDEA,
    successMessage,
  };
};

/**
 * deleteFailure Action
 * @param {object} failureMessage
 *
 * @returns {object} - action type and payload
 */
export const deleteIdeaFailure = (failureMessage) => {
  return {
    type: types.DELETE_IDEA_FAILURE,
    failureMessage,
  };
};

/**
 * addComment Action
 * @param {object} comment
 *
 * @returns {object} - action type and payload
 */
export const addComment = (comment) => {
  return {
    type: types.ADD_COMMENT,
    comment,
  };
};

/**
 * addCommentFailure Action
 * @param {object} failureMessage
 *
 * @returns {object} - action type and payload
 */
export const addCommentFailure = (failureMessage) => {
  return {
    type: types.ADD_COMMENT_FAILURE,
    failureMessage,
  };
};

/**
 * getIdeaComments Action
 * @param {object} comments
 *
 * @returns {object} - action type and payload
 */
export const getIdeaComments = (comments) => {
  return {
    type: types.FETCH_COMMENTS,
    comments,
  };
};

/**
 * getIdeaCommentsFailure Action
 * @param {object} failureMessage
 *
 * @returns {object} - action type and payload
 */
export const getIdeaCommentsFailure = (failureMessage) => {
  return {
    type: types.FETCH_COMMENT_FAILURE,
    failureMessage,
  };
};

/**
 * Async action creator to create an idea
 * @param {object} idea
 * @returns {function} - dispatch
 */
export const createAnIdea = (idea) => {
  return (dispatch) => {
    return axios.post('/api/v1/idea', idea).then(
      (response) => {
        dispatch(createIdea(response.data.newIdea, response.data.message));
        return true;
      },
      (error) => {
        dispatch(createIdeaFailure(error.response.data.error));
        return false;
      },
    );
  };
};

/**
 * Async action creator to get all ideas
 *
 * @returns {function} - dispatch
 */
export const getAllIdeas = () => {
  return (dispatch) => {
    return axios.get('/api/v1/ideas').then(
      (response) => {
        dispatch(getIdeas(response.data.ideas));
        return true;
      },
      (error) => {
        dispatch(getIdeasFailure(error.response.data.error));
        Materialize.toast(`${error.response.data.error}`, 5000, 'red');
        return false;
      },
    );
  };
};

/**
 * Async action creator to get all ideas
 *
 * @returns {function} - dispatch
 */
export const getAllIdeasByAUser = () => {
  return (dispatch) => {
    return axios.get('/api/v1/user/ideas').then(
      (response) => {
        dispatch(getIdeasByAUser(response.data.ideas));
        return true;
      },
      (error) => {
        dispatch(getIdeasByAUserFailure(error.response.data.error));
        Materialize.toast(`${error.response.data.error}`, 5000, 'red');
        return false;
      },
    );
  };
};

/**
 * Async action creator to get an ideas
 * @param {string} ideaId
 *
 * @returns {function} - dispatch
 */
export const getAnIdea = (ideaId) => {
  return (dispatch) => {
    return axios.get(`/api/v1/idea/${ideaId}`).then(
      (response) => {
        dispatch(getIdea(response.data.idea));
        return true;
      },
      (error) => {
        dispatch(getIdeaFailure(error.response.data.error));
        Materialize.toast(`${error.response.data.error}`, 5000, 'red');
        return false;
      },
    );
  };
};

/**
 * Async action creator to update an idea
 * @param {object} Id
 * @param {object} idea
 *
 * @returns {function} - dispatch
 */
export const updateAnIdea = (Id, idea) => {
  return (dispatch) => {
    return axios.put(`/api/v1/idea/${Id}`, idea).then(
      (response) => {
        dispatch(updateIdea(response.data.idea));
        Materialize.toast(`${response.data.message}`, 5000, 'green');
        return true;
      },
      (error) => {
        dispatch(updateIdeaFailure(error.response.data.error));
        Materialize.toast(`${error.response.data.error}`, 5000, 'red');
        return false;
      },
    );
  };
};

/**
 * Async action creator to delete an idea
 * @param {object} id
 * @param {object} successMessage
 *
 * @returns {function} - dispatch
 */
export const deleteAnIdea = (id, successMessage) => {
  return (dispatch) => {
    return axios.delete(`/api/v1/idea/${id}`, successMessage).then(
      (response) => {
        dispatch(deleteIdea(response.data.message));
        return true;
      },
      (error) => {
        dispatch(deleteIdeaFailure(error.response.data.error));
        return false;
      },
    );
  };
};

/**
 * Async action creator to add a comment to an idea
 * @param {object} ideaId
 * @param {object} comment
 *
 * @returns {function} - dispatch
 */
export const addAComment = (ideaId, comment) => {
  return (dispatch) => {
    return axios.post(`/api/v1/idea/${ideaId}/comment`, comment).then(
      (response) => {
        dispatch(addComment(response.data.comment));
        return true;
      },
      (error) => {
        dispatch(addCommentFailure(error.response.data.message));
        return false;
      },
    );
  };
};

/**
 * Async action creator to get an idea comments
 * @param {object} ideaId
 *
 * @returns {function} - dispatch
 */
export const getAnIdeaComments = (ideaId) => {
  return (dispatch) => {
    return axios.get(`/api/v1/idea/${ideaId}/comments`).then(
      (response) => {
        dispatch(getIdeaComments(response.data.comments));
        return true;
      },
      (error) => {
        dispatch(getIdeaCommentsFailure(error.response.data.error));
        return false;
      },
    );
  };
};
