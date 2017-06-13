import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import jwt from 'jsonwebtoken';
import { createStore, applyMiddleware, compose } from 'redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import rootReducer from './rootReducer';
import setAuthorizationToken from './utils/setAuthorizationToken';
import { setCurrentUser } from './actions/loginActions';
import '../node_modules/sweetalert/dist/sweetalert.css';
import '../node_modules/sweetalert/dist/sweetalert.min';
import './styles.scss';


import routes from './routes';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
);

if (window.localStorage.jwtToken && typeof window !== 'undefined') {
  setAuthorizationToken(window.localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwt.decode(window.localStorage.jwtToken)));
}
injectTapEventPlugin();
  /**
   *
   * @returns {object} react componenents to render
   *
   */
render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>, document.getElementById('app'));
