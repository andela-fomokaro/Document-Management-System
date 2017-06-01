import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { SET_CURRENT_USER } from '../actions/types';

/**
 *
 *
 * @export setCurrentUser
 * @param {object} user information
 * @returns {object} return user request
 */
export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

/**
 *
 *
 * @export userSignupRequest
 * @param {object} userData
 * @returns {Function} returns dispatch
 */
export function userSignupRequest(userData) {
  return dispatch => axios.post('/api/users/', userData).then((res) => {
    const token = res.data.token;
    setAuthorizationToken(token);
    dispatch(setCurrentUser(jwt.decode(token)));
  });
}

/**
 *
 *
 * @export
 * @param {object} identifier
 * @returns {Function} returns dispatch
 */
export function isUserExists(identifier) {
  return () => axios.post(`/api/users/${identifier}`);
}

