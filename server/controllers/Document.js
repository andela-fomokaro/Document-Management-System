/* eslint-disable no-dupe-keys*/
import db from '../models';
import Helper from '../helpers/controllerHelper';


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
      .then((document) => {
        res.status(201).json({
          message: 'Your Document Has Been Created',
          document,
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
                .send({ message: 'The Document You Are Trying To Access Is Private' });
            }
            db.Users.findById(document.ownerId).then((user) => {
              if ((role.title !== 'admin') && (document.access === 'role') &&
              (user.roleId !== req.decoded.roleId)) {
                return res.status(403)
                .send({ message: 'The Document You Are Trying To Access Is Private' });
              }
              res.status(200).send({
                document,
              });
            });
          })
          .catch(() => res.status(400).send({
            message: 'An error occured',
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
        return res.status(404).send('Document Not Found');
      }
      query.count = documents.count;
      const pagination = Helper.pagination(query);
      const documentObject
      = documents.rows.map(doc => Object.assign({}, {
        access: doc.access,
        type: doc.type,
        ownerId: doc.ownerId,
        title: doc.title,
        content: doc.content,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
        id: doc.id,
      }));
      res.status(200).send({ pagination, documents: documentObject });
    }).catch(() => res.status(400).send({
      message: 'An error occured',
    }));
  },
/**
   * Update a document based on the id
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @returns {void} Response object
   */
  updateDocument(req, res) {
    db.Roles.findById(req.decoded.roleId)
      .then((role) => {
        db.Documents
          .findById(req.params.id)
          .then((document) => {
            if (!document) {
              return res.status(404).send({
                message: 'Document Not Found',
              });
            }
            if (role.title
            !== 'admin' && document.ownerId !== req.decoded.userId) {
              return res.status(403)
                .send({ message: 'You Cannot View Document' });
            }
            if (req.body.ownerId && !(role.title === 'admin')) {
              return res.status(403).send({
                message: 'You Cannot View Document',
              });
            }
            document
              .update(req.body)
              .then((documentUpdate) => {
                res.status(200).send({
                  message: 'Document Updated Successfully',
                  documentUpdate,
                  document,
                });
              });
          })
        .catch(() => res.status(400).send({
          message: 'An error occured',
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
                message: 'Document Not Found',
              });
            }
            if ((req.decoded.roleId !== 1)
            && (document.ownerId !== req.decoded.userId)) {
              return res.status(403).send({
                message: 'You Are Not Allowed To Delete This Document',
              });
            }
            document
            .destroy()
            .then(() => res.status(200).send({
              message: 'Document Successfully Deleted',
            }));
          })
      .catch(() => res.status(400).send({
        message: 'An error occured',
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
                pagination, documents: documents.rows,
              });
            });
        } else {
          query.where = {
            $or: {
              $or: {
                access: { $eq: 'public' },
                $and: {
                  access: { $eq: 'private' },
                  ownerId: { $eq: req.decoded.userId },
                },
                $and: {
                  access: { $eq: 'role' },
                  '$User.roleId$': { $eq: req.decoded.roleId },
                },
              },
              ownerId: { $eq: req.decoded.userId },
            },
          };
          query.include = [
            {
              model: db.Users,
            },
          ];
          db.Documents
            .findAndCountAll(query)
            .then((documents) => {
              query.count = documents.count;
              query.limit = (req.query.limit > 0) ? req.query.limit : 6;
              query.offset = (req.query.offset > 0) ? req.query.offset : 0;
              const documentObject
              = documents.rows.map(doc => Object.assign({}, {
                access: doc.access,
                type: doc.type,
                ownerId: doc.ownerId,
                title: doc.title,
                content: doc.content,
                createdAt: doc.createdAt,
                updatedAt: doc.updatedAt,
                id: doc.id,
              }));
              const pagination = Helper.pagination(query);
              res.status(200).send({
                pagination, documents: documentObject,
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
    const searchTerm = req.query.search;
    db.Roles.findById(req.decoded.roleId)
      .then((role) => {
        if (searchTerm === '') {
          return res.status(400).send({
            message: 'Document Search Does Not Search',
          });
        }

        let query = {
          where: {
            $and: [{
              $or: {
                title: {
                  $iLike: `%${searchTerm}%`,
                },
                content: {
                  $iLike: `%${searchTerm}%`,
                },
              },
            }, {
              $or: {
                access: { $ne: 'private' },
                ownerId: { $eq: req.decoded.userId },
              },
            }],
            $or: {
              $or: {
                access: { $eq: 'public' },
                $and: {
                  access: { $eq: 'private' },
                  ownerId: { $eq: req.decoded.userId },
                },
                $and: {
                  access: { $eq: 'role' },
                  '$User.roleId$': { $eq: req.decoded.roleId },
                },
              },
              ownerId: { $eq: req.decoded.userId },
            },
          },
          include: [
            {
              model: db.Users,
            },
          ],
        };

        if (role.title === 'admin') {
          query = {
            where: {
              $or: {
                title: {
                  $iLike: `%${searchTerm}%`,
                },
                content: {
                  $iLike: `%${searchTerm}%`,
                },
              },
            },
          };
        }

        query.limit = (req.query.limit > 0) ? req.query.limit : 6;
        query.offset = (req.query.offset > 0) ? req.query.offset : 0;
        query.order = '"createdAt" ASC ';
        db.Documents
          .findAndCountAll(query)
          .then((documents) => {
            const documentObject
             = documents.rows.map(doc => Object.assign({}, {
               access: doc.access,
               type: doc.type,
               ownerId: doc.ownerId,
               title: doc.title,
               content: doc.content,
               createdAt: doc.createdAt,
               updatedAt: doc.updatedAt,
             }));
            query.count = documents.count;
            const pagination = Helper.pagination(query);
            if (documents.rows.length === '') {
              return res.status(404).send({
                message: 'Search Term Not Found',
              });
            }
            res.status(200).send({
              pagination, documents: documentObject,
            });
          });
      });
  },
  /**
   * Gets all documents relevant to search term
   * and documents with role access for priviledged a particular user
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @return {Object} - Returns response object
   */
  searchMyDocument(req, res) {
    const searchTerm = req.query.search;
    db.Roles.findById(req.decoded.roleId)
      .then(() => {
        if (searchTerm === '') {
          return res.status(400).send({
            message: 'Document Search Does Not Search',
          });
        }

        const query = {
          where: {
            $and: [{
              $or: {
                title: {
                  $iLike: `%${searchTerm}%`,
                },
                content: {
                  $iLike: `%${searchTerm}%`,
                },
              },
            }],
            $or: {
              $and: {
                access: { $eq: 'public' },
                ownerId: { $eq: req.decoded.userId },
                $and: {
                  access: { $eq: 'private' },
                  ownerId: { $eq: req.decoded.userId },
                },
                $and: {
                  access: { $eq: 'role' },
                  ownerId: { $eq: req.decoded.userId },
                },
              },
              ownerId: { $eq: req.decoded.userId },
            },
          },
          include: [
            {
              model: db.Users,
            },
          ],
        };
        query.limit = (req.query.limit > 0) ? req.query.limit : 6;
        query.offset = (req.query.offset > 0) ? req.query.offset : 0;
        query.order = '"createdAt" ASC ';
        db.Documents
          .findAndCountAll(query)
          .then((documents) => {
            const documentObject
             = documents.rows.map(doc => Object.assign({}, {
               access: doc.access,
               type: doc.type,
               ownerId: doc.ownerId,
               title: doc.title,
               content: doc.content,
               createdAt: doc.createdAt,
               updatedAt: doc.updatedAt,
             }));
            query.count = documents.count;
            const pagination = Helper.pagination(query);
            if (documents.rows.length === '') {
              return res.status(404).send({
                message: 'Search Term Not Found',
              });
            }
            res.status(200).send({
              pagination, documents: documentObject,
            });
          });
      });
  },
};


export default Document;
