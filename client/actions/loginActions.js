import axios from 'axios';
import jwt from 'jsonwebtoken';
import { browserHistory } from 'react-router';
import { SET_CURRENT_USER, LOGOUT_USER } from '../actions/types';
import setAuthorizationToken from '../utils/setAuthorizationToken';


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
 * @export logout
 * @returns {Function} returns dispatch
 */
export function logout() {
  return (dispatch) => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    axios.post('/api/users/logout')
      .then(() => {
        browserHistory.push('/');
      });
    dispatch({
      type: LOGOUT_USER
    });
  };
}
/**
 *
 *
 * @export login
 * @param {object} data user data
 * @returns {Function} returns dispatch
 */
export function login(data) {
  return dispatch => axios.post('/api/users/login', data).then((res) => {
    const token = res.data.token;
    window.localStorage.setItem('jwtToken', token);
    setAuthorizationToken(token);
    dispatch(setCurrentUser(jwt.decode(token)));
  }
  );
}
