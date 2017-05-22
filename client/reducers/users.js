import { GET_USERS, CREATE_USERS, DELETE_USER, UPDATE_USER, SET_SINGLE_USER, UPDATE_USERS, SEARCH_USERS } from '../actions/types';

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
      // console.log(state);
      // // return Object.assign({}, state, { user: [...state, action.payload] });
      // const newInfo = action.payload;
      // const stateCopy = [...state];
      // stateCopy.push(newInfo);
      // return stateCopy;
      return state;
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
