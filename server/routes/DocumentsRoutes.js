import Document from '../controllers/Document';

module.exports = (app) => {
  app.post('/documents', Document.create);


  app.get('/document/:id', Document.findDocument);

  app.get('/users/:id/documents', Document.findUsersDocuments);// worked on still have issues


  app.put('/documents/:id', Document.update);


  app.delete('/documents/:id', Document.delete);


  app.get('/documents/', Document.findAllDocument);


  app.get('/search/documents', Document.search);

  // Work on pagination and search
};
