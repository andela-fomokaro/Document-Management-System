import axios from '../utils/index';
import { getPayload } from '../utils/helpers';

const usersid = getPayload().userId;

// if (getPayload()) {
//   const userId = getPayload().userId;
// }
// else {
//  return userId = getPayload().userId;
// }

/**
 *
 *
 * @export getUsers
 * @returns {Function} returns dispatch
 */
export function getUsers() {
  return (dispatch) => {
    axios.get('/api/users/')
      .then((res) => {
        dispatch({
          type: 'GET_USERS',
          payload: res.data.users.rows,
        });
      });
  };
}

/**
 *
 *
 * @export createUsers
 * @param {object} data
 * @returns {Function} returns dispatch
 */
export function createUsers(data) {
  return (dispatch) => {
    axios.post('/api/users/', data)
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
 * @param {number} id
 * @returns {Function} returns dispatch
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
 * @param {number} [id=usersid]
 * @param {object} data
 * @returns {Function} returns dispatch
 */
export function updateUser(data, id = usersid) {
  return (dispatch) => {
    axios.put(`/api/users/${id}`, data)
    .then((res) => {
      dispatch({
        type: 'UPDATE_USER',
        payload: res.data.user,
      });
    });
  };
}

/**
 *
 *
 * @export updateUsers
 * @param {object} user
 * @returns {Function} returns dispatch
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
 * @export  getSingleUser
 * @param {number} [id=usersid]
 * @returns {Function} returns dispatch
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

/**
 *
 *
 * @export searchUsers
 * @param {string} term
 * @returns {Function} returns dispatch
 */
export function searchUsers(term) {
  return (dispatch) => {
    axios.get(`api/search/users?search=${term}`)
      .then((res) => {
        dispatch({
          type: 'SEARCH_USERS',
          payload: res.data.user.rows
        });
      });
  };
}

// /**
//  * 
//  * 
//  * @export
//  * @returns 
//  */
// export function userPagination() {
//   return (dispatch) => {
//     axios.get('/api/users/')
//       .then((res) => {
//         dispatch({
//           type: 'PAGINATION',
//           payload: res.data,
//         });
//       });
//   };
// }