import Roles from '../controllers/Role';
import Auth from '../middlewares/Auth';

// // Roles routes, Please take a look at the Roles controller for details
// const RoleRoutes = (router) => {
//   router.route('/roles')
//   .get(Roles.getRoles)
//   .post(Roles.createRoles);

//   router.route('/roles/:id')
//   .get(Roles.getRole)
//   .put(Roles.updateRoles)
//   .delete(Roles.deleteRoles);
// };

// export default RoleRoutes;
module.exports = (app) => {
  app.post('/api/roles', Auth.verifyToken, Roles.createRoles);

  app.get('/api/roles', Auth.verifyToken, Roles.getRoles);

  app.get('/api/roles/:id', Auth.verifyToken, Roles.getRolesById);

  app.delete('/api/roles/:id', Auth.verifyToken, Roles.deleteRole);

  app.put('/api/roles/:id', Auth.verifyToken, Roles.updateRole);
};
