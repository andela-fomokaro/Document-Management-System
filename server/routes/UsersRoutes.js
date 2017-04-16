
import User from '../controllers/User';

module.exports = (app) => {
  app.post('/users/login', User.login);


  app.post('/users/', User.create);


  app.get('/users/', User.matchingInstances);


  app.get('/users/:id', User.findUser);


  app.put('/users/:id', User.update);


  app.delete('/users/:id', User.delete);


  app.post('/users/logout', User.logOut);


  app.get('/search/users/', User.search);
};
