import db from '../models';
import Helper from '../helpers/controllerHelper';
import Auth from '../middlewares/Auth';


const User = {
  /**
   * Create a user
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @return {Object} Response object
   */
  create(req, res) {
    db.Users.findOne({ where: { email: req.body.email } })
      .then((existingUser) => {
        if (existingUser) {
          return res.status(400).send({
            message: 'This User Already exist'
          });
        }
      });
    db.Users.create(req.body)
      .then((newUser) => {
        const token = Auth.getToken(newUser);
        res.status(201).json({
          message: 'User Has Been Successfully Created',
          token,
          newUser
        });
      })
      .catch(() => res.status(400).send({ message: 'An error occured' }));
  },

/**
   * Login a user
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @return {Object} Response object
   */
  login(req, res) {
    db.Users
    .findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user && user.validPassword(req.body.password)) {
        user.update({ active: true });
        const token = Auth.getToken(user);
        return res.status(200)
        .send({
          message: 'You have sucessfully logged in',
          user,
          token
        });
      }
      res.status(401)
          .send({
            message: 'Login details entered are incorrect'
          });
    });
  },
/**
   * List all users
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @return {Object} Response object
   */
  allUsers(req, res) {
    const limit = req.query.limit || 6;
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
              message: 'Successfull',
              users,
              pagination
            });
        }
      }).catch(() => res.status(401).send({
        message: 'An error occured'
      }));
  },
/**
   * Find User By Id
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @return {Object} Response object
   */
  findUser(req, res) {
    db.Roles
    .findById(req.decoded.roleId)
    .then((role) => {
      db.Users
        .findById(req.params.id)
        .then((user) => {
          if (!user) {
            return res.status(404).send({
              message: 'User Does Not Exist',
            });
          }
          if ((role.title !== 'admin') && (req.decoded.userId !== user.id)) {
            return res.status(403)
            .send({ message: 'You cannot access user profile' });
          }
          req.decoded.user = user;
          res.status(200).send(req.decoded.user);
        })
        .catch(() => res.status(401).send({
          message: 'An error occured'
        }));
    });
  },
/**
   * Delete a particular Document
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @return {void} Response object
   */
  delete(req, res) {
    db.Roles
      .findById(req.decoded.roleId)
      .then((role) => {
        db.Users
          .findById(req.params.id)
          .then((user) => {
            if (!user) {
              return res.status(404).send({
                message: 'User Does Not Exist',
              });
            }
            user
            .destroy()
            .then(() => res.status(200).send({
              message: 'User deleted successfully',
            }));
          })
      .catch(() => res.status(400).send({
        message: 'An error occured'
      }));
      });
  },
/**
   * Update a user
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @return {Object} Response object
   */
  updateUsers(req, res) {
    db.Roles.findById(req.decoded.roleId)
      .then((role) => {
        db.Users
          .findById(req.params.id)
          .then((user) => {
            if (!user) {
              return res.status(404).send({
                message: 'User Does Not Exist',
              });
            }
            if ((role.title !== 'admin') && (req.decoded.userId !== user.id)) {
              return res.status(403).send({
                message: 'You are not authorized to update user profile'
              });
            }
            user
              .update(req.body)
              .then(user => res.status(200).send({
                message: 'Update Successful!',
                user
              }));
          })
        .catch(() => res.status(400).send({
          message: 'An error occured'
        }));
      });
  },

 /**
   * Gets all users relevant to search query
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @return {Object} - Returns response object
   */
  search(req, res) {
    const userSearch = req.query.search;
    if (userSearch === '') {
      return res.status(400).send({
        message: 'User Search Does Not Search'
      });
    }
    let pagination;
    const query = {
      where: { $or: [
        {
          username: { $iLike: `%${userSearch}%` }
        }, {
          fullNames: { $iLike: `%${userSearch}%` }
        },
        {
          email: { $iLike: `%${userSearch}%` }
        },
      ]
      }
    };
    query.limit = (req.query.limit > 0) ? req.query.limit : 6;
    query.offset = (req.query.offset > 0) ? req.query.offset : 0;
    query.order = '"createdAt" ASC ';
    return db.Users.findAndCountAll(query)
      .then((users) => {
        query.count = users.count;
        pagination = Helper.pagination(query);
        if (users.rows.length === 0) {
          return res.status(404).send({
            message: 'Search Term Not Found'
          });
        }
        res.status(200)
          .send({
            message: 'Your search was successful',
            users,
            pagination
          });
      });
  },
};

export default User;
