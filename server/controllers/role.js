import db from '../models';

const Roles = {

  createRoles(req, res) {
    console.log(req.body.title);// remove later
    db.Roles.findOne({ where: { title: req.body.title } })
    .then((role) => {
      if (role) {
        return res.status(409)
          .send({
            message: `${req.body.title} already exists`
          });
      }
      db.Roles.create(req.body)
      .then((newRole) => {
        res.status(201)
        .send(newRole);
      })
      .catch((err) => { // CHECK THESE LATER
        res.status(500)
        .send({ message: 'error occurred' });
      });
    });
  },

  getRoles(req, res) {
    db.Roles.findAll()
    .then((role) => {
      res.status(201)
      .send(role);
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
  },

};



export default Roles;
