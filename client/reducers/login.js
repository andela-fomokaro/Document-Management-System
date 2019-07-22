import isEmpty from 'lodash/isEmpty';
import { SET_CURRENT_USER } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {},
};
/**
* Login reducer
*
* @export
* @param {object} [state=initialState] initial state
* @param {object} action action
* @returns {object} reduced or initial state
*/
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state,
        ...{
          isAuthenticated: !isEmpty(action.user),
          user: action.user,
        } };
    default: return state;
  }
};
