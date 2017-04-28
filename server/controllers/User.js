import db from '../models';
import Helper from '../helpers/controllerHelper';
import Auth from '../middlewares/Auth';
import validateInput from '../../shared/validate/signUp';

const User = {

  create(req, res) {
    const validate = validateInput(req.body);
    db.Users.create(req.body)
      .then((newUser) => {
        console.log(newUser);
        res.status(201).json({
          message: 'User was created successfully',
          newUser
        });
      })
      .catch(err => res.status(400).send({ err: validate, message: 'error' }));
  },

  login(req, res) {
    db.Users
    .findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user && user.password) {
        user.update({ active: true });
        const token = Auth.getToken(user);
        return res.status(200)
        .send({
          message: 'You have successfully logged in',
          user,
          token
        });
      }
      res.status(401)
          .send({
            message: 'Please enter a valid email or password to log in'
          });
    });
  },
  allUsers(req, res) {
    const limit = req.query.limit || 3;
    const offset = req.query.offset || 0;
    db.Users.findAndCountAll({ fields: [
      'id',
      'username',
      'fullName',
      'email',
      'roleId',
      'createdAt',
      'updatedAt'
    ],
      limit,
      offset })
      .then((users) => {
        if (users) {
          const condition = {
            count: users.count,
            limit,
            offset
          };
          const pagination = Helper.pagination(condition);
          res.status(200)
            .send({
              message: 'You have successfully retrieved all users',
              users,
              pagination
            });
        }
      });
  },

  findUser(req, res) {
    db.Users.findOne({
      where: {
        $or: [{ id: req.params.id },
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
    if (Number(req.params.id) === 1) {
      return res.status(403).send({
        message: 'You cannot delete default admin'
      });
    }
    db.Users.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: 'User Not Found',
        });
      }
      user.destroy()
      .then(() => {
        'User has been deleted successfully';
      })
       .catch(err => res.status(500).send(err.errors));
    });
  },

  logOut(req, res) {
    res.status(200)
      .send({ message: 'Successfully logged out!' });
  },

  update(req, res) {
    db.Users
      .findById(req.params.id)
      .then((users) => {
        if (!users) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }

        users
          .update(req.body, {
            fields: Object.keys(req.body)
          })
          .then(updatedUsers => res.status(200).send({ updatedUsers }));
      })
      .catch(err => res.status(400).send({
        message: err.errors
      }));
  },


  search(req, res) {
    const limit = req.query.limit || 3;
    const offset = req.query.offset || 0;
    const term = req.query.name;
    let condition = {};
    let pagination;
    const query = { fields: [
      'username',
      'fullName',
      'email',
      'roleId',
      'createdAt',
      'updatedAt'
    ],
      limit,
      offset,
      where: {
        username: {
          $iLike: `%${term}%`
        }
      }
    };
    db.Users.findAndCountAll(query)
      .then((users) => {
        condition = {
          count: users.count,
          limit,
          offset,
        };
        pagination = Helper.pagination(condition);
        res.status(200)
          .send({
            message: 'Your search was successful',
            users,
            pagination
          });
      });
  }
};

export default User;
