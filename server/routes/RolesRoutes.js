import Roles from '../controllers/Role';

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
  app.post('/roles', Roles.createRoles);

  app.get('/roles', Roles.getRoles);

  app.delete('/roles/:id', Roles.deleteRole);

  app.put('/roles/:id', Roles.updateRole);
};
