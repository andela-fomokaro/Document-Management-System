import axios from '../utils/index';

/**
 *
 * Craete Role Action
 * @export createRole
 * @param {object} data role information
 * @returns {Function} returns dispatch
 */
export function createRole(data) {
  return dispatch => axios.post('/api/roles', data)
      .then((res) => {
        dispatch({
          type: 'CREATE_ROLE',
          payload: res.data
        });
      });
}

/**
 *
 * Get Roles Action
 * @export getRoles
 * @returns {Function} returns dispatch
 */
export function getRoles() {
  return dispatch => axios.get('/api/roles')
      .then((res) => {
        dispatch({
          type: 'GET_ROLES',
          payload: res.data
        });
      });
}

/**
 *
 * Update Role Action
 * @export updateRole
 * @param {object} role
 * @returns {Function} returns dispatch
 */
export function updateRole(role) {
  return dispatch => axios.put(`/api/roles/${role.id}`, role)
      .then((res) => {
        dispatch({
          type: 'UPDATE_ROLES',
          payload: res.data
        });
      });
}

/**
 *
 * Delete Role Action
 * @export deleteRole
 * @param {number} id
 * @returns {Function} returns dispatch
 */
export function deleteRole(id) {
  return dispatch => axios.delete(`/api/roles/${id}`)
      .then(() => {
        dispatch({
          type: 'DELETE_ROLES',
          id
        });
      });
}
