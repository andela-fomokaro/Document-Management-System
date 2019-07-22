import Roles from '../controllers/Role';
import Auth from '../middlewares/Auth';

module.exports = (app) => {
  app.post('/api/roles', Auth.verifyToken, Auth.verifyAdmin, Roles.createRole);

  app.get('/api/roles', Auth.verifyToken, Auth.verifyAdmin, Roles.getRoles);

  app.get('/api/roles/:id', Auth.verifyToken,
  Auth.verifyToken, Roles.getRolesById);

  app.delete('/api/roles/:id', Auth.verifyToken,
  Auth.verifyAdmin, Roles.deleteRole);

  app.put('/api/roles/:id', Auth.verifyToken,
  Auth.verifyAdmin, Roles.updateRole);
};
