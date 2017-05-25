import Document from '../controllers/Document';
import Auth from '../middlewares/Auth';

module.exports = (app) => {
  app.post('/api/documents', Auth.verifyToken, Document.create);


  app.get('/api/documents/:id', Auth.verifyToken, Document.findDocument);

  app.get('/api/users/:id/documents', Auth.verifyToken,
   Document.findUsersDocuments);// worked on still have issues


  app.put('/api/documents/:id', Auth.verifyToken, Document.updateDoc);


  app.delete('/api/documents/:id', Auth.verifyToken, Document.delete);


  app.get('/api/documents/', Auth.verifyToken, Document.findAllDocument);


  app.get('/api/search/documents', Auth.verifyToken, Document.search);
};
