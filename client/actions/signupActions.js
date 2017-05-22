import axios from 'axios';

/**
 * 
 * 
 * @export
 * @param {any} userData
 * @returns
 */
export function userSignupRequest(userData) {
  return dispatch => axios.post('/api/users/', userData);
}

/**
 * 
 * 
 * @export
 * @param {any} identifier 
 * @returns 
 */
export function isUserExists(identifier) {
  return dispatch => axios.post(`/api/users/${identifier}`);
}
