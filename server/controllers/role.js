import db from '../models';

const Roles = {
  /**
   * Create a new Role
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @return {Object} Response object
   */
  createRole(req, res) {
    db.Roles.findOne({ where: { title: req.body.title } })
    .then((existingRole) => {
      if (existingRole) {
        return res.status(400).send({
          message: 'Validation error. Please enter unique parameters only!'
        });
      }
      db.Roles.create({
        title: req.body.title
      })
      .then(role => res.status(201).send(role));
    });
  },
/**
   * List all Roles
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @return {Object} Response object
   */
  getRoles(req, res) {
    db.Roles.findAll()
    .then((roles) => {
      res.status(201)
      .send(roles);
    });
  },

/**
   * Retrive a Role based on id with all users on that role
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @return {Object} Response object
   */
  getRolesById(req, res) { // mer
    db.Roles
      .findById(req.params.id)
      .then((role) => {
        if (!role) {
          return res.status(404).send({
            message: 'Role Does Not Exist',
          });
        }
        res.status(200).send(role);
      })
      .catch(() => res.status(400).send({
        message: 'An error occured. Invalid parameters, try again!'
      }));
  },

/**
   * Delete a Role based on id
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @return {Object} Response object
   */
  deleteRole(req, res) {
    db.Roles
      .findById(req.params.id)
      .then((role) => {
        if (!role) {
          return res.status(404).send({
            message: 'Role Does Not Exist',
          });
        }
        if (role.title === 'regular' || role.title === 'admin') {
          return res.status(400).send({
            message: 'An error occured. You cannot delete default roles'
          });
        }
        role
          .destroy()
          .then(() => res.status(200).send({
            message: 'Role deleted successfully'
          }));
      })
      .catch(() => res.status(400).send({
        message: 'An error occured. Invalid parameters, try again!'
      }));
  },

   /**
   * Update a Role based on id
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @return {Object} Response object
   */
  updateRole(req, res) {
    db.Roles.findOne({ where: { title: req.body.title } })
    .then((existingRole) => {
      if (existingRole) {
        return res.status(400).send({
          message: 'Validation error. Please enter unique parameters only!'
        });
      }
      db.Roles.findById(req.params.id)
      .then((role) => {
        if (!role) {
          return res.status(404).send({
            message: 'Role Does Not Exist',
          });
        }
        if (role.title === 'regular' || role.title === 'admin') {
          return res.status(400).send({
            message: 'An error occured. You cannot update default roles'
          });
        }
        role
          .update(req.body, {
            fields: Object.keys(req.body)
          })
          .then(updatedRole => res.status(200).send({
            message: 'Update Successful', updatedRole
          }));
      })
      .catch(() => res.status(400).send({
        message: 'An error occured. Invalid parameters, try again!'
      }));
    });
  },
};


export default Roles;
