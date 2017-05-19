import axios from '../utils/index';

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

export function updateUser(user) {
  return (dispatch) => {
    axios.put(`/api/users/${user.id}`, user)
    .then((res) => {
      dispatch({
        type: 'UPDATE_USER',
        payload: res.data,
        id: user.id
      });
    });
  };
}
