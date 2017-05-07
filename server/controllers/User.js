import db from '../models';
import Helper from '../helpers/controllerHelper';
import Auth from '../middlewares/Auth';
/**
 * UsersController class to create and manage users
 */
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
            message: 'User Already Exist!'
          });
        }
      });
    db.Users.create(req.body)
      .then((newUser) => {
        const token = Auth.getToken(newUser);
        res.status(201).json({
          message: 'User was created successfully',
          token,
          newUser
        });
      })
      .catch(() => res.status(400).send({ message: 'An error occured. Invalid parameters, try again!' }));
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
/**
   * List all users
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @return {Object} Response object
   */
  allUsers(req, res) {
    const limit = req.query.limit || 10;
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
/**
   * Retrive a user's details
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
            .send({ message: 'You are not authorized to access this user' });
          }
          req.decoded.user = user;
          res.status(200).send(req.decoded.user);
        })
        .catch(() => res.status(400).send({
          message: 'An error occured. Invalid parameters, try again!'
        }));
    });
  },
/**
   * Delete a particular Document
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @return {Object} Response object
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
            if ((role.title !== 'admin') && (req.decoded.userId !== user.id)) {
              return res.status(403).send({
                message: 'You are not authorized to delete this user',
              });
            }
            if ((role.title === 'admin') && (Number(req.params.id) === 1)) {
              return res.status(403)
              .send({ message: 'You cannot delete default admin user account' });
            }
            user
            .destroy()
            .then(() => res.status(200).send({
              message: 'User deleted successfully.',
            }));
          })
      .catch(() => res.status(400).send({
        message: 'An error occured. Invalid parameters, try again!'
      }));
      });
  },
/**
   * Logout a user
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @return {Object} Response object
   */
  logOut(req, res) {
    res.status(200)
      .send({ message: 'Successfully logged out!' });
  },
/**
   * Update a user
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @return {Object} Response object
   */
  update(req, res) {
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
            if (req.body.id) {
              return res.status(403).send({
                message: 'Unauthorised access. You cannot update userId property'
              });
            }
            if ((role.title !== 'admin') && req.body.roleId) {
              return res.status(403).send({
                message: 'Unauthorised access. You cannot update roleId property'
              });
            }
            if ((role.title !== 'admin') && (req.decoded.userId !== user.id)) {
              return res.status(403).send({
                message: 'Unauthorised access. You cannot update this user\'s property'
              });
            }
            user
              .update(req.body, { fields: Object.keys(req.body) })
              .then(user => res.status(200).send({
                message: 'Update Successful!',
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email
                }
              }));
          })
        .catch(() => res.status(400).send({
          message: 'An error occured. Invalid parameters, try again!'
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
    const search = req.query.search;

    if (search === '') {
      return res.status(400).send({
        message: 'Invalid Search Parameter!'
      });
    }
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
        if (users.rows.length === 0) {
          return res.status(404).send({
            message: 'Search Does Not Match Any User!'
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

  /**
   * Retrieve all documents belonging to a user
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @return {Object} Response object
   */
  retrieveUserDocuments(req, res) {
    db.Roles
      .findById(req.decoded.roleId)
      .then((role) => {
        let query = {};
        if (role.title === 'admin') {
          query = {
            where: {
              ownerId: { $eq: req.params.id }
            }
          };
        } else {
          query = {
            where: {
              $and: {
                ownerId: { $eq: req.params.id },
                $or: {
                  access: { $eq: 'public' },
                  $and: {
                    access: { $eq: 'private' },
                    ownerId: { $eq: req.decoded.userId }
                  },
                  $or: {
                    $and: {
                      access: { $eq: 'role' },
                      '$db.Users.roleId$': { $eq: req.decoded.roleId }
                    }
                  }
                }
              }
            },
            include: [
              {
                model: db.Users
              }
            ]
          };
        }

        query.limit = (req.query.limit > 0) ? req.query.limit : 10;
        query.offset = (req.query.offset > 0) ? req.query.offset : 0;
        db.Documents
          .findAndCountAll(query)
          .then((documents) => {
            const filteredDocuments = documents.rows.map(document => Object.assign({}, {
              title: document.title,
              content: document.content,
              access: document.access,
              type: document.type,
              ownerId: document.ownerId,
              createdAt: document.createdAt,
              updatedAt: document.updatedAt
            }));
            const pagination = Helper.pagination(
              query.limit, query.offset, documents.count
            );
            if (documents.rows.length === 0) {
              return res.status(404).send({
                message: 'No document match the request.'
              });
            }
            res.status(200).send({
              pagination, documents: filteredDocuments
            });
          })
          .catch(() => res.status(400).send({
            message: 'An error occured. Invalid parameters, try again!'
          }));
      });
  }

};

export default User;
