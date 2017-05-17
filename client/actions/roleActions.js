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
        console.log('taiwo', res.data);
        dispatch({
          type: 'GET_ROLES',
          payload: res.data
        });
      });
  };
}
// export function updateRole(event) {
//   return (dispatch) => {
//     axios.put(`/api/roles/${event.id}`)
//       .then((res) => {
//         dispatch({
//           type: 'UPDATE_ROLES',
//           payload: res.data.newRole
//         });
//       });
//   };
// }

export function deleteRole(id) {
  return (dispatch) => {
    axios.delete(`/api/roles/${id}`)
      .then((res) => {
        console.log(res, 'Faith');
        dispatch({
          type: 'DELETE_ROLES',
          id
        });
      });
  };
}
