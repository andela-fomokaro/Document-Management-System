import { combineReducers } from 'redux';
import flashMessages from './reducers/flashMessages';
import login from './reducers/login';
import documents from './reducers/documents';
import roles from './reducers/roles';
import users from './reducers/users';


export default combineReducers({
  documents,
  flashMessages,
  login,
  roles,
  users
});
