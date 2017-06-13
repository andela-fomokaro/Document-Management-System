import { GET_USERS, CREATE_USERS,
   DELETE_USER, UPDATE_USER,
   SET_SINGLE_USER, SEARCH_USERS } from '../actions/types';


/**
* Users reducer
*
* @export
* @param {object} [state=initialState] initial state
* @param {object} action action
* @returns {object} reduced or initial state
*/
const initialState = {
  users: {
    count: 0,
    rows: [],
  },
  user: {},
  pagination: {
    page_count: 0,
    page: 0,
    page_size: 0,
    total_count: 0,
  },
};
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_USERS:
      return { ...state,
        ...{ users: action.payload.users,
          pagination: action.payload.pagination } };
    case CREATE_USERS: {
      return { ...state, ...{ users: { rows: [...state.users.rows, action.payload] } } };
    }
    case DELETE_USER:
      return { ...state,
        ...{ users: { rows: state.users.rows.filter(user => user.id !== action.id) } } };

    case UPDATE_USER:
      return { ...state,
        ...{ users: { rows:
        [...state.users.rows.filter(user => user.id !== action.payload.id),
          action.payload] },
          user: action.payload } };

    case SET_SINGLE_USER:
      return { ...state,
        ...{ user: action.payload } };

    case SEARCH_USERS:
      return action.payload;
    default:
      return state;
  }
};
