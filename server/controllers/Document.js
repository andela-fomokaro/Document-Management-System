/* eslint-disable no-dupe-keys*/
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
   * @return {void} Response object
   */
  create(req, res) {
    db.Documents.create({
      title: req.body.title,
      content: req.body.content,
      access: req.body.access,
      ownerId: req.decoded.userId,
    })
      .then((newDocument) => {
        res.status(201).json({
          message: 'Successfully',
          newDocument
        });
      })
      .catch(() => res.json({ message: 'An error occured' }));
  },

/**
   * Retrieve a specific document based on the id
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @return {void} Response object
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
                .send({ message: 'Unauthorized' });
            }
            db.Users.findById(document.ownerId).then((user) => {
              if ((role.title !== 'admin') && (document.access === 'role') &&
              (user.roleId !== req.decoded.roleId)) {
                return res.status(403)
                .send({ message: 'Unauthorized' });
              }
              res.status(200).send({
                document
              });
            });
          })
          .catch(() => res.status(400).send({
            message: 'An error occured'
          }));
      });
  },

  /**
   * Find users documents by ownerId
   *
   * @param {Object} req - Request Object
   * @param {Object} res - Response Object
   * @returns {void} Response object
   */
  findUsersDocuments(req, res) {
    const query = {};
    query.limit = (req.query.limit > 0) ? req.query.limit : 6;
    query.offset = (req.query.offset > 0) ? req.query.offset : 0;
    query.where = { ownerId: req.params.id };
    db.Documents.findAndCountAll(query)
    .then((documents) => {
      if (!documents) {
        return res.status(404).send('Document does not exist');
      }
      query.count = documents.count;
      const pagination = Helper.pagination(query);
      const filteredDocuments
      = documents.rows.map(document => Object.assign({}, {
        title: document.title,
        content: document.content,
        access: document.access,
        type: document.type,
        ownerId: document.ownerId,
        createdAt: document.createdAt,
        updatedAt: document.updatedAt,
        id: document.id
      }));
      res.status(200).send({ pagination, documents: filteredDocuments });
    });
  },
/**
   * Update a document based on the id
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {void} Response object
   */
  updateDoc(req, res) {
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
            if (role.title
            !== 'admin' && document.ownerId !== req.decoded.userId) {
              return res.status(403)
                .send({ message: 'You are not authorized' });
            }
            if (req.body.ownerId && !(role.title === 'admin')) {
              return res.status(403).send({
                message: 'You cannot edit document'
              });
            }
            document
              .update(req.body)
              .then((updatedDocument) => {
                res.status(200).send({
                  message: 'Update successful!',
                  updatedDocument,
                  document,
                });
              });
          })
        .catch(() => res.status(400).send({
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
    db.Documents
          .findById(req.params.id)
          .then((document) => {
            if (!document) {
              return res.status(404).send({
                message: 'Document Does Not Exist',
              });
            }
            if ((req.decoded.roleId !== 1)
            && (document.ownerId !== req.decoded.userId)) {
              return res.status(403).send({
                message: 'You are not authorized',
              });
            }
            document
            .destroy()
            .then(() => res.status(200).send({
              message: 'Document deleted',
            }));
          })
      .catch(() => res.status(400).send({
        message: 'An error occured'
      }));
  },
/**
   * Find all Documents
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @return {void} Response object
   */
  findAllDocument(req, res) {
    db.Roles.findById(req.decoded.roleId)
      .then((role) => {
        const query = {};
        query.limit = (req.query.limit > 0) ? req.query.limit : 6;
        query.offset = (req.query.offset > 0) ? req.query.offset : 0;
        query.attributes = { exclude: ['ownerId'] };
        if (role.title === 'admin') {
          db.Documents
            .findAndCountAll(query)
            .then((documents) => {
              query.count = documents.count;
              const pagination = Helper.pagination(query);
              return res.status(200).send({
                pagination, documents: documents.rows
              });
            });
        } else {
          query.where = {
            $or: {
              $or: {
                access: { $eq: 'public' },
                $and: {
                  access: { $eq: 'private' },
                  ownerId: { $eq: req.decoded.userId }
                },
                $and: {
                  access: { $eq: 'role' },
                  '$User.roleId$': { $eq: req.decoded.roleId }
                }
              },
              ownerId: { $eq: req.decoded.userId }
            }
          };
          query.include = [
            {
              model: db.Users
            }
          ];
          db.Documents
            .findAndCountAll(query)
            .then((documents) => {
              query.count = documents.count;
              query.limit = (req.query.limit > 0) ? req.query.limit : 6;
              query.offset = (req.query.offset > 0) ? req.query.offset : 0;
              query.attributes = { exclude: ['ownerId'] };
              const filteredDocuments
              = documents.rows.map(document => Object.assign({}, {
                title: document.title,
                content: document.content,
                access: document.access,
                type: document.type,
                ownerId: document.ownerId,
                createdAt: document.createdAt,
                updatedAt: document.updatedAt,
                id: document.id
              }));
              const pagination = Helper.pagination(query);
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
                  '$User.roleId$': { $eq: req.decoded.roleId }
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

        query.limit = (req.query.limit > 0) ? req.query.limit : 6;
        query.offset = (req.query.offset > 0) ? req.query.offset : 0;
        query.order = '"createdAt" DESC';
        query.attributes = { exclude: ['id'] };
        db.Documents
          .findAndCountAll(query)
          .then((documents) => {
            const filteredDocuments
             = documents.rows.map(document => Object.assign({}, {
               title: document.title,
               content: document.content,
               access: document.access,
               type: document.type,
               ownerId: document.ownerId,
               createdAt: document.createdAt,
               updatedAt: document.updatedAt
             }));
            query.count = documents.count;
            const pagination = Helper.pagination(query);
            if (documents.rows.length === 0) {
              return res.status(404).send({
                message: 'Search Does Not Match'
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
