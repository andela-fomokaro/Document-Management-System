import React from 'react';
import { Route, IndexRoute } from 'react-router';


import App from './components/App';
import Greetings from './components/Greetings';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';
import DashBoardPage from './components/DashBoardPage';
import LoadDocument from './components/LoadDocuments';
import singleDocument from './components/document/singleDocument';
import manageRole from './components/role/ManageRoles';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Greetings} />
    <Route path="signup" component={SignupPage} />
    <Route path="login" component={LoginPage} />
    <Route path="dashboardpage" component={DashBoardPage} />
    <Route path="loadDocuments" component={LoadDocument} />
    <Route path="document/:id" component={singleDocument} />
    <Route path="managerole" component={manageRole} />
  </Route>
);
