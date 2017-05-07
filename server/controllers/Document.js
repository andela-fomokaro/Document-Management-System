import db from '../models';
import Helper from '../helpers/controllerHelper';
/**
 * DocumentsController class to create and manage documents
 */
const Document = {
  /**
   * Create a new Document
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @return {Object} Response object
   */
  create(req, res) { //
    db.Documents.create({
      title: req.body.title,
      content: req.body.content,
      access: req.body.access,
      ownerId: req.decoded.userId,
    })
      .then((newDocument) => {
        res.status(201).json({
          message: 'Document was created successfully',
          newDocument
        });
      })
      .catch(() => res.json({ message: 'An error occured. Invalid parameters, try again!' }));
  },

/**
   * Retrieve a specific document based on the id
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @return {Object} Response object
   */

  findDocument(req, res) {
    db.Roles.findById(req.decoded.roleId)
      .then((role) => {
        db.Documents
          .findById(req.params.id)
          .then((document) => {
            if (!document) {
              return res.status(404).send({
                message: 'Document Does Not Exist',
              });
            }

            if ((role.title !== 'admin') && (document.access === 'private') &&
            (document.ownerId !== req.decoded.userId)) {
              return res.status(403)
                .send({ message: 'You are not authorized to view this document' });
            }

            db.Users.findById(document.ownerId).then((user) => {
              if ((role.title !== 'admin') && (document.access === 'role') &&
              (user.roleId !== req.decoded.roleId)) {
                return res.status(403)
                .send({ message: 'You are not authorized to view this document' });
              }

              res.status(200).send({
                document
              });
            });
          })
          .catch(() => res.status(400).send({
            message: 'An error occured. Invalid parameters, try again!'
          }));
      });
  },

  findUsersDocuments(req, res) {
    db.Documents.findAll({ where: { ownerId: req.params.id } })
          .then(documents => res.status(200).send(documents));
  },
/**
   * Update a document based on the id
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {Object} Response object
   */
  update(req, res) {
    db.Roles.findById(req.decoded.roleId)
      .then((role) => {
        db.Documents
          .findById(req.params.id)
          .then((document) => {
            if (!document) {
              return res.status(404).send({
                message: 'Document Does Not Exist',
              });
            }
            if ((role.title !== 'admin') && (document.ownerId !== req.decoded.userId)) {
              return res.status(403)
                .send({ message: 'You are not authorized to update this document' });
            }
            if (req.body.ownerId && !(role.title === 'admin')) {
              return res.status(403).send({
                message: 'You cannot edit document ownerId property'
              });
            }
            document
              .update(req.body, { fields: Object.keys(req.body) })
              .then(updatedDocument => res.status(200).send({
                message: 'Update successful!',
                updatedDocument
              }));
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
        db.Documents
          .findById(req.params.id)
          .then((document) => {
            if (!document) {
              return res.status(404).send({
                message: 'Document Does Not Exist',
              });
            }
            if ((role.title !== 'admin') && (document.ownerId !== req.decoded.userId)) {
              return res.status(403).send({
                message: 'You are not authorized to delete this document',
              });
            }
            document
            .destroy()
            .then(() => res.status(200).send({
              message: 'Document deleted successfully',
            }));
          })
      .catch(() => res.status(400).send({
        message: 'An error occured. Invalid parameters, try again!'
      }));
      });
  },
/**
   * Find all Documents
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @return {Object} Response object
   */
  findAllDocument(req, res) {
    db.Roles.findById(req.decoded.roleId)
      .then((role) => {
        let query = {};
        query.limit = (req.query.limit > 0) ? req.query.limit : 10;
        query.offset = (req.query.offset > 0) ? req.query.offset : 0;
        query.attributes = { exclude: ['ownerId'] };

        if (role.title === 'admin') {
          db.Documents
            .findAndCountAll(query)
            .then((documents) => {
              const pagination = Helper.pagination(
                query.limit, query.offset, documents.count
              );
              return res.status(200).send({
                pagination, documents: documents.rows
              });
            });
        } else {
          query = {
            where: {
              $or: {
                $or: {
                  access: { $eq: 'public' },
                  $and: {
                    access: { $eq: 'role' },
                    ownerId: { $eq: req.decoded.userId }
                  },
                  $and: {
                    access: { $eq: 'role' },
                    '$db.Users.roleId$': { $eq: req.decoded.roleId }
                  }
                },
                ownerId: { $eq: req.decoded.userId }
              }
            },
            include: [
              {
                model: db.Users
              }
            ]
          };

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
              res.status(200).send({
                pagination, documents: filteredDocuments
              });
            });
        }
      });
  },

/**
   * Gets all public documents relevant to search term
   * and documents with role access for priviledged users
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @return {Object} - Returns response object
   */
  search(req, res) {
    db.Roles.findById(req.decoded.roleId)
      .then((role) => {
        const search = req.query.search;

        if (search === '') {
          return res.status(400).send({
            message: 'Invalid Search Parameter!'
          });
        }

        let query = {
          where: {
            $and: [{
              $or: {
                title: {
                  $iLike: `%${search}%`
                },
                content: {
                  $iLike: `%${search}%`
                }
              }
            }, {
              $or: {
                access: { $ne: 'private' },
                ownerId: { $eq: req.decoded.userId }
              }
            }],
            $or: {
              $or: {
                access: { $eq: 'public' },
                $and: {
                  access: { $eq: 'role' },
                  ownerId: { $eq: req.decoded.userId }
                },
                $and: {
                  access: { $eq: 'role' },
                  '$db.Users.roleId$': { $eq: req.decoded.roleId }
                }
              },
              ownerId: { $eq: req.decoded.userId }
            }
          },
          include: [
            {
              model: db.Users
            }
          ]
        };

        if (role.title === 'admin') {
          query = {
            where: {
              $or: {
                title: {
                  $iLike: `%${search}%`
                },
                content: {
                  $iLike: `%${search}%`
                }
              }
            }
          };
        }

        query.limit = (req.query.limit > 0) ? req.query.limit : 10;
        query.offset = (req.query.offset > 0) ? req.query.offset : 0;
        query.order = '"createdAt" DESC';
        query.attributes = { exclude: ['id'] };
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
                message: 'Search Does Not Match Any Document!'
              });
            }
            res.status(200).send({
              pagination, documents: filteredDocuments
            });
          });
      });
  }
};

export default Document;
