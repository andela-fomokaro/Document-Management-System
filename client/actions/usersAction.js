import jwtDecode from 'jwt-decode';
import axios from '../utils/index';
import { getPayload } from '../utils/helpers';

const usersid = getPayload().userId;
console.log(usersid, ' uid');

// if (getPayload()) {
//   const userId = getPayload().userId;
// }
// else {
//  return userId = getPayload().userId;
// }

/**
 * 
 * 
 * @export
 * @returns 
 */
export function getUsers() {
  return (dispatch) => {
    axios.get('/api/users/')
      .then((res) => {
        dispatch({
          type: 'GET_USERS',
          payload: res.data.users.rows
        });
      });
  };
}

/**
 * 
 * 
 * @export
 * @param {any} event 
 * @returns 
 */
export function createUsers(event) {
  return (dispatch) => {
    axios.post('/api/users/', event)
      .then((res) => {
        dispatch({
          type: 'CREATE_USERS',
          payload: res.data.newUser
        });
      });
  };
}

/**
 * 
 * 
 * @export
 * @param {any} id 
 * @returns 
 */
export function deleteUser(id) {
  return (dispatch) => {
    axios.delete(`/api/users/${id}`)
      .then(() => {
        dispatch({
          type: 'DELETE_USER',
          id
        });
      });
  };
}

/**
 * 
 * 
 * @export
 * @param {any} [id=usersid] 
 * @param {any} data 
 * @returns 
 */
export function updateUser(data, id = usersid) {
  console.log(id, 'sdzfxgchvjbknlm;,.');
  return (dispatch) => {
    axios.put(`/api/users/${id}`, data)
    .then((res) => {
      dispatch({
        type: 'UPDATE_USER',
        payload: res.data,
      });
    });
  };
}

/**
 * 
 * 
 * @export
 * @param {any} user 
 * @returns 
 */
export function updateUsers(user) {
  return (dispatch) => {
    axios.put(`/api/users/${user.id}`, user)
    .then((res) => {
      dispatch({
        type: 'UPDATE_USERS',
        updateUser: res.data,
      });
    });
  };
}

/**
 * 
 * 
 * @export
 * @param {any} [id=usersid] 
 * @returns 
 */
export function getSingleUser(id = usersid) {
  return (dispatch) => {
    axios.get(`/api/users/${id}`)
    .then((res) => {
      dispatch(
        {
          type: 'SET_SINGLE_USER',
          payload: res.data
        }
      );
    });
  };
}

