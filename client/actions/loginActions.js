import axios from 'axios';
import jwt from 'jsonwebtoken';
import { SET_CURRENT_USER } from '../actions/types';
import setAuthorizationToken from '../utils/setAuthorizationToken';


export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function logout() {
  return dispatch => {
    window.localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
    window.location = '/';
  };
}

export function login(data) {
  return dispatch => axios.post('/api/users/login', data).then((res) => {
    const token = res.data.token;
    window.localStorage.setItem('jwtToken', token);
    setAuthorizationToken(token);
    dispatch(setCurrentUser(jwt.decode(token)));
  }
  );
}
