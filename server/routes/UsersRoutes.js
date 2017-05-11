import Auth from '../middlewares/Auth';
import User from '../controllers/User';

module.exports = (app) => {
  app.post('/api/users/login', User.login);


  app.post('/api/users/', User.create);


  app.get('/api/users/:id', Auth.verifyToken, User.findUser);

  app.get('/api/users/', Auth.verifyToken, Auth.verifyAdmin, User.allUsers);


  app.put('/api/users/:id', Auth.verifyToken, Auth.verifyAdmin, User.update);


  app.delete('/api/users/:id', Auth.verifyToken, Auth.verifyAdmin, User.delete);


  // app.get('/api/users/:id/documents', Auth.verifyToken, Auth.verifyAdmin, User.retrieveUserDocuments);


  app.post('/api/users/logout', Auth.verifyToken, User.logOut);


  app.get('/api/search/users', Auth.verifyToken, User.search);
};

