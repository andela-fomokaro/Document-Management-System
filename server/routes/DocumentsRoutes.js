import Document from '../controllers/Document';

module.exports = (app) => {
  app.post('/documents', Document.create);


  app.get('/documents', Document.matchingInstances);


  app.get('/document/:id', Document.findUser);


  app.put('/documents/:id', Document.update);


  app.delete('/documents/:id', Document.delete);


  app.get('/users/:id/documents', Document.findAll);
};
