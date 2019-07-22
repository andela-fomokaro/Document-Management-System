import axios from 'axios';
import jwt from 'jsonwebtoken';
import { SET_CURRENT_USER } from '../actions/types';
import setAuthorizationToken from '../utils/setAuthorizationToken';


/**
 * Set Current User Action
 *
 * @export setCurrentUser
 * @param {object} user information
 * @returns {object} return user request
 */
export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user,
  };
}

/**
 *
 * Logout Action
 *
 * @export logout
 * @returns {function} returns dispatch
 */
export function logout() {
  return () => {
    setAuthorizationToken(false);
    document.location.href = '/';
  };
}
/**
 * Login Action
 *
 * @export login
 * @param {object} data user data
 * @returns {function} returns dispatch
 */
export function login(data) {
  return dispatch => axios.post('/api/users/login', data).then((res) => {
    const token = res.data.token;
    setAuthorizationToken(token);
    dispatch(setCurrentUser(jwt.decode(token)));
  },
  );
}
