import findIndex from 'lodash/findIndex';
import { GET_USERS, CREATE_USERS, DELETE_USER, UPDATE_USER, SET_SINGLE_USER, UPDATE_USERS, SEARCH_USERS } from '../actions/types';

export default (state = [], action = {}) => {
  switch (action.type) {
    case GET_USERS:
      return action.payload;
    case CREATE_USERS: {
      const stateCopy = Object.assign({}, state);
      stateCopy.users.rows.push(action.payload);
      return stateCopy;
    }
    case DELETE_USER: {
      const deletedUserIndex =
      findIndex(state.users.rows, { id: action.id });// find more about lodash
      const stateCopy = Object.assign({}, state);
      stateCopy.users.rows.splice(deletedUserIndex, 1);
      return stateCopy;
    }
    case UPDATE_USER: {
      return action.payload;
    }
    case UPDATE_USERS: {
      return state;
    }
    case SET_SINGLE_USER:
      return action.payload;
    case SEARCH_USERS:
      return action.payload;
    default:
      return state;
  }
};
