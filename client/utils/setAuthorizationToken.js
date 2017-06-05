import axios from 'axios';

/**
 *
 * Set Authorization For Token Function
 * @export
 * @param {string} token
 * @return {void}
 */
export default function setAuthorizationToken(token) {
  if (token) {
    window.localStorage.setItem('jwtToken', token);
  } else {
    window.localStorage.removeItem('jwtToken');
    delete axios.defaults.headers.common['x-access-token'];
  }
}
