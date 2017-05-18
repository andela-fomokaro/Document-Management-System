import axios from '../utils/index';

export function createRole(event) {
  return (dispatch) => {
    axios.post('/api/roles', event)
      .then((res) => {
        dispatch({
          type: 'CREATE_ROLE',
          payload: res.data
        });
      });
  };
}

export function getRoles() {
  return (dispatch) => {
    axios.get('/api/roles')
      .then((res) => {
        dispatch({
          type: 'GET_ROLES',
          payload: res.data
        });
      });
  };
}
export function updateRole(role) {
  return (dispatch) => {
    axios.put(`/api/roles/${role.id}`, role)
      .then((res) => {
        dispatch({
          type: 'UPDATE_ROLES',
          payload: res.data
        });
      });
  };
}

export function deleteRole(id) {
  return (dispatch) => {
    axios.delete(`/api/roles/${id}`)
      .then(() => {
        dispatch({
          type: 'DELETE_ROLES',
          id
        });
      });
  };
}
