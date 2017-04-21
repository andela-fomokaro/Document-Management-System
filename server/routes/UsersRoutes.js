import Auth from '../middlewares/Auth';
import User from '../controllers/User';

module.exports = (app) => {
  app.post('/users/login', User.login);


  app.post('/users/', User.create);


  app.get('/users/:id', Auth.verifyToken, User.findUser); // protect

  app.get('/users/', Auth.verifyToken, User.allUsers);


  app.put('/users/:id', Auth.verifyToken, User.update);


  app.delete('/users/:id', Auth.verifyToken, Auth.verifyAdmin, User.delete);


  app.post('/users/logout', Auth.verifyToken, User.logOut);


  app.get('/search/users', Auth.verifyToken, User.search);// work on this
};
