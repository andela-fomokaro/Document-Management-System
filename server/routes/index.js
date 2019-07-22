import UsersRoutes from './UsersRoutes';
import DocumentsRoutes from './DocumentsRoutes';
import RolesRoutes from './RolesRoutes';

const Routes = (router) => {
  UsersRoutes(router);
  DocumentsRoutes(router);
  RolesRoutes(router);
};

export default Routes;

