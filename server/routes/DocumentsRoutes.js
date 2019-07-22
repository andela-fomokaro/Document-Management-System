import Document from '../controllers/Document';
import Auth from '../middlewares/Auth';

module.exports = (app) => {
  app.post('/api/documents', Auth.verifyToken, Document.create);


  app.get('/api/documents/:id', Auth.verifyToken, Document.findDocument);

  app.get('/api/users/:id/documents', Auth.verifyToken,
   Document.findUsersDocuments);


  app.put('/api/documents/:id', Auth.verifyToken, Document.updateDocument);


  app.delete('/api/documents/:id', Auth.verifyToken, Document.delete);


  app.get('/api/documents/', Auth.verifyToken, Document.findAllDocument);


  app.get('/api/search/documents', Auth.verifyToken, Document.search);

  app.get('/api/documentsearch/documents', Auth.verifyToken,
  Document.searchMyDocument);
};

