import { combineReducers } from 'redux';
import login from './reducers/login';
import documents from './reducers/documents';
import roles from './reducers/roles';
import users from './reducers/users';


// export default combineReducers({
//   documents,
//   login,
//   roles,
//   users
// });

// const rootReducer = (state, action) => {
//   if (action.type === 'USER_LOGOUT') {
//     state = undefined;
//   }
//   return combineReducers(state, action);
// };

const appReducer = combineReducers({
  documents,
  login,
  roles,
  users
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_USER') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
