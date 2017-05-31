import React from 'react';
import { Route, IndexRoute } from 'react-router';
import protectRoute from './utils/protectRoute';


import App from './components/App.jsx';
import Greetings from './components/Greetings.jsx';
import SignupPage from './components/signup/SignupPage.jsx';
import LoginPage from './components/login/LoginPage.jsx';
import DashBoardPage from './components/DashBoardPage.jsx';
import LoadDocument from './components/LoadDocuments.jsx';
import singleDocument from './components/document/singleDocument.jsx';
import manageRole from './components/role/ManageRoles.jsx';
import manageUsers from './components/users/ManageUsers.jsx';
import UserProfile from './components/users/UserProfile.jsx';


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
