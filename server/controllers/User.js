import db from '../models';

const User = {

  create(req, res) {
    db.Users.create(req.body)
      .then((newUser) => {
        res.status(201).json({
          message: 'User was created successfully',
          newUser
        });
      })
      .catch(err => res.json({ err, message: 'error' }));
  },

  login(req, res) {
    db.Users
    .findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user && user.password) {
        user.update({ active: true });
        return res.status(200)
        .send({
          message: 'You have successfully logged in',
          user
        });
      }
      res.status(401)
          .send({
            message: 'Please enter a valid email or password to log in'
          });
    });
  },
  allUsers(req, res) {
    db.Users.findAll({ fields: [
      'id',
      'username',
      'fullName',
      'email',
      'RoleId',
      'createdAt',
      'updatedAt'
    ] })
      .then(usersList => res.status(200).send(usersList));
  },

  findUser(req, res) {
    db.Users.findOne({
      where: {
        $or: [{ email: req.params.id },
          { username: req.params.id }]
      }
    }).then((user) => {
      if (!user) {
        return res.status(404)
        .send({ message: `User ${req.params.id} cannot be found` });
      }
      res.status(200).send(user);
    });
  },

  delete(req, res) {
    db.Users.destroy({
      where: {
        username: req.params.id
      }
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }

        if ((user) === 1) {
          return res.status(403)
            .send({ message: 'You cannot delete default admin user account!' });
        }
        res.status(200)
          .send({
            message: 'This account has been successfully deleted'
          });
      })
      .catch(err => res.status(500).send(err.errors));
  },

  logOut(req, res) {
    res.status(200)
      .send({ message: 'Successfully logged out!' });
  },

  update(req, res) {
    res.json({ message: 'welcome to matching Instances' });
  },

  matchingInstances(req, res) {
    res.json({ message: 'welcome to matching Instances' });
  },

  pagination(req, res) {
    res.json({ message: 'welcome to logout' });
  },

  search(req, res) {
    res.json({ message: 'welcome to logout' });
  }
};

export default User;
