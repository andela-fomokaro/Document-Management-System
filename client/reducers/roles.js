import { CREATE_ROLE, GET_ROLES, DELETE_ROLES, UPDATE_ROLES } from '../actions/types';


export default (state = [], action = {}) => {
  switch (action.type) {
    case CREATE_ROLE: {
      const newRole = action.payload;
      const stateCopy = [...state];
      stateCopy.push(newRole);
       Materialize.toast('Role Created Successfully', 4000);
      return stateCopy;
    }
    case GET_ROLES:
      return action.payload;
    case DELETE_ROLES: {
      return [...state.filter(role => role.id !== action.id)];
    }
    case UPDATE_ROLES: {
      const updatedRole = action.payload.updatedRole;
      const stateCopy = [...state];
      stateCopy.forEach((role) => {
        if (role.id === updatedRole.id) {
          role.title = updatedRole.title;
        }
      });
      Materialize.toast('Role Updated Successfully', 4000);
      return stateCopy;
    }
    default:
      return state;
  }
};
