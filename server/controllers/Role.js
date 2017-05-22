import db from '../models';

const Roles = {

  createRoles(req, res) {
    db.Roles.create(req.body)
      .then((newRole) => {
        res.status(201).json({
          message: 'Role was created successfully',
          newRole
        });
      })
      .catch(err => res.json({ err, message: 'error' }));
  },

  getRoles(req, res) {
    db.Roles.findAll()
    .then((role) => {
      res.status(201)
      .send(role);
    });
  },

  getRolesById(req, res) {
    db.Roles.findOne({
      where: {
        id: req.params.id
      }
    }).then((roles) => {
      if (!roles) {
        return res.status(404)
        .send({ message: `Role ${req.params.id} cannot be found` });
      }
      res.status(200).send(roles);
    });
  },


  deleteRole(req, res) {
    db.Roles.destroy({
      where: {
        title: req.params.id
      }
    })
      .then((title) => {
        if (!title) {
          return res.status(404).send({
            message: 'Role Not Found',
          });
        }

        if ((title) === 1) {
          return res.status(403)
            .send({ message: 'You cannot delete admin role' });
        }
        res.status(200)
          .send({
            message: `Role ${req.params.id} deleted`
          });
      })
      .catch(err => res.status(500).send(err.errors));
  },

  updateRole(req, res) {
    db.Roles
      .findById(req.params.id)
      .then((role) => {
        if (!role) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }

        role
          .update(req.body, {
            fields: Object.keys(req.body)
          })
          .then(updatedrole => res.status(200).send(updatedrole));
      })
      .catch(err => res.status(400).send({
        message: err.errors
      }));
  },

};



export default Roles;
