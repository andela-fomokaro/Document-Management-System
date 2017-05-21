import axios from 'axios';
import jwt from 'jsonwebtoken';
import { browserHistory } from 'react-router';
import { SET_CURRENT_USER, LOGOUT_USER } from '../actions/types';
import setAuthorizationToken from '../utils/setAuthorizationToken';


/**
 *
 *
 * @export
 * @param {any} user
 * @returns
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
 * @export
 * @returns
 */
export function logout() {
  // window.location = '/';
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
 * @export
 * @param {any} data
 * @returns
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
