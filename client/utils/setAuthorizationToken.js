import axios from 'axios';
/**
 * Set authorization header
 * @param {string} token
 *
 * @returns {void}
 */
const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common.authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.authorization;
  }
};

export default setAuthorizationToken;
