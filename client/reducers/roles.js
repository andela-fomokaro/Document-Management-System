import { CREATE_ROLE, GET_ROLES, DELETE_ROLES, UPDATE_ROLES } from '../actions/types';


export default (state = [], action = {}) => {
  switch (action.type) {
    case CREATE_ROLE: {
      const newRole = action.payload;
      const stateCopy = [...state];
      stateCopy.push(newRole);
      return stateCopy;
    }
    case GET_ROLES:
      return action.payload;
    case DELETE_ROLES: {
      return [...state.filter(role => role.id !== action.id)];
    }
    // case UPDATE_ROLES:
    //   return action.data;
    default: return state;
  }
};
