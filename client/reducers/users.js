import { GET_USERS, CREATE_USERS, DELETE_USER, UPDATE_USER } from '../actions/types';

export default (state = [], action = {}) => {
  switch (action.type) {
    case GET_USERS:
      return action.payload;
    case CREATE_USERS: {
      const newUser = action.payload;
      const stateCopy = [...state];
      stateCopy.push(newUser);
      return stateCopy;
    }
    case DELETE_USER: {
      return [...state.filter(user => user.id !== action.id)];
    }
    case UPDATE_USER: {
      return state;
    }
    default:
      return state;
  }
};
