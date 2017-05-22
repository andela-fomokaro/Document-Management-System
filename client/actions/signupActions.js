import axios from 'axios';

/**
 *
 *
 * @export userSignupRequest
 * @param {object} userData
 * @returns {Function} returns dispatch
 */
export function userSignupRequest(userData) {
  return dispatch => axios.post('/api/users/', userData);
}

/**
 *
 *
 * @export
 * @param {object} identifier
 * @returns {Function} returns dispatch
 */
export function isUserExists(identifier) {
  return dispatch => axios.post(`/api/users/${identifier}`);
}
