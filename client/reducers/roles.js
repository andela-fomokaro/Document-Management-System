import { CREATE_ROLE, GET_ROLES, DELETE_ROLES } from '../actions/types';

/**
* Roles reducer
*
* @export
* @param {array} [state=initialState] initial state
* @param {object} action action
* @returns {object} reduced or initial state
*/
export default (state = [], action = {}) => {
  switch (action.type) {
    case CREATE_ROLE:
      return [...state, action.payload];

    case GET_ROLES:
      return action.payload;

    case DELETE_ROLES: {
      return [...state.filter(role => role.id !== action.id)];
    }
    default:
      return state;
  }
};
