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
  app.post('/roles', Auth.verifyToken, Roles.createRoles);

  app.get('/roles', Auth.verifyToken, Roles.getRoles);

  app.get('/roles/:id', Auth.verifyToken, Roles.getRolesById);

  app.delete('/roles/:id', Auth.verifyToken, Roles.deleteRole);

  app.put('/roles/:id', Auth.verifyToken, Roles.updateRole);
};
