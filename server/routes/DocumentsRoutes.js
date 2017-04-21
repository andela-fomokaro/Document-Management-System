import Document from '../controllers/Document';
import Auth from '../middlewares/Auth';

module.exports = (app) => {
  app.post('/documents', Auth.verifyToken, Document.create);


  app.get('/document/:id', Auth.verifyToken, Document.findDocument);

  app.get('/users/:id/documents', Auth.verifyToken, Document.findUsersDocuments);// worked on still have issues


  app.put('/documents/:id', Auth.verifyToken, Document.update);


  app.delete('/documents/:id', Auth.verifyToken, Document.delete);


  app.get('/documents/', Auth.verifyToken, Document.findAllDocument);


  app.get('/search/documents', Auth.verifyToken, Document.search);

  // Work on pagination and search
};
