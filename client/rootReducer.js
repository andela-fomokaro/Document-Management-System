import { combineReducers } from 'redux';
import login from './reducers/login';
import documents from './reducers/documents';
import roles from './reducers/roles';
import users from './reducers/users';


/**
* App reducer
*
* @export
* @param {void}
*/
const appReducer = combineReducers({
  documents,
  login,
  roles,
  users,
});

/**
* App reducer
*
* @export
* @param {state} state state
* @param {action} action action
* @returns {object} app reducer
*/
const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_USER') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
