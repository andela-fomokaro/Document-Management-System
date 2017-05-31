import axios from '../utils/index';


/**
 *
 *
 * @export getUsers
 * @param {number} [offset=0] document page difference
 * @returns {Function} returns dispatch
 */
export function getUsers(offset = 0) {
  return (dispatch) => {
    axios.get(`/api/users?offset=${offset}`)
      .then((res) => {
        dispatch({
          type: 'GET_USERS',
          payload: res.data,
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
 * @param {object} data
 *  @param {number} [id=usersid]
 * @returns {Function} returns dispatch
 */
export function updateUser(data, id) {
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
 * @export  getSingleUser
 * @param {number} [id=usersid]
 * @returns {Function} returns dispatch
 */
export function getSingleUser(id) {
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
 * @param {number} [offset=0] document page difference
 * @returns {Function} returns dispatch
 */
export function searchUsers(term, offset = 0) {
  return (dispatch) => {
    axios.get(`api/search/users?search=${term}&offset=${offset}`)
      .then((res) => {
        dispatch({
          type: 'SEARCH_USERS',
          payload: res.data
        });
      });
  };
}
