import axios from 'axios';

/**
 * 
 * 
 * @export
 * @param {any} token 
 */
export default function setAuthorizationToken(token) {
  if (token) {
    window.localStorage.setItem('jwtToken', token);
    // axios.defaults.headers.common['x-access-token'] = token;
    // console.log("set token");
  } else {
    window.localStorage.removeItem('jwtToken');
    delete axios.defaults.headers.common['x-access-token'];
    console.log("destroy token");
  }
}
