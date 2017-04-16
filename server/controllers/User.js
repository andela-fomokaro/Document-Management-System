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

  matchingInstances(req, res) {
    res.json({ message: 'welcome to matching Instances' });
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

  update(req, res) {
    res.json({ message: 'welcome to update' });
  },

  delete(req, res) {
    res.json({ message: 'welcome to delete' });
  },

  logOut(req, res) {
    res.json({ message: 'welcome to logout' });
  },

  pagination(req, res) {
    res.json({ message: 'welcome to logout' });
  },

  search(req, res) {
    res.json({ message: 'welcome to logout' });
  }
};

export default User;