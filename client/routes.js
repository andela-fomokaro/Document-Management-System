import React from 'react';
import { Route, IndexRoute } from 'react-router';
import protectRoute from './utils/protectRoute';


import App from './components/App';
import Greetings from './components/Greetings';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';
import DashBoardPage from './components/DashBoardPage';
import LoadDocument from './components/LoadDocuments';
import singleDocument from './components/document/singleDocument';
import manageRole from './components/role/ManageRoles';
import manageUsers from './components/users/ManageUsers';
import UserProfile from './components/users/UserProfile';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={Greetings} />
    <Route path="signup" component={SignupPage} />
    <Route path="login" component={LoginPage} />
    <Route component={protectRoute(DashBoardPage)} path="dashboardpage" />
    <Route component={protectRoute(LoadDocument)} path="loadDocuments" />
    <Route component={protectRoute(singleDocument)} path="document/:id" />
    <Route component={protectRoute(manageRole)} path="managerole" />
    <Route component={protectRoute(manageUsers)} path="manageusers" />
    <Route component={protectRoute(UserProfile)} path="myprofile" />
  </Route>
);
