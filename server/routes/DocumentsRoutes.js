import Document from '../controllers/Document';

module.exports = (app) => {
  app.post('/documents', Document.create);


  app.get('/document/:id', Document.findDocument);

  app.get('/users/:id/documents', Document.findUsersDocuments);// work on


  app.put('/documents/:id', Document.update);


  app.delete('/documents/:id', Document.delete);


  app.get('/documents/', Document.findAllDocument);

  // Work on pagination and search
};
