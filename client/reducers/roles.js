import { CREATE_ROLE, GET_ROLES, DELETE_ROLES, UPDATE_ROLES } from '../actions/types';

export default (state = [], action = {}) => {
  switch (action.type) {
    case CREATE_ROLE:
      Materialize.toast('Role Created Successfully', 4000);
      return [...state, action.payload];

    case GET_ROLES:
      return action.payload;

    case DELETE_ROLES: {
      return [...state.filter(role => role.id !== action.id)];
    }

    case UPDATE_ROLES:
      Materialize.toast('Role Updated Successfully', 4000);
      return [...state.filter(role => role.id !== action.payload), action.payload];
    default:
      return state;
  }
};
