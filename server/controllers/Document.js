import db from '../models';
import Helper from '../helpers/controllerHelper';
const User = db.User;

const Document = {
  create(req, res) {
    db.Documents.create({
      title: req.body.title,
      content: req.body.content,
      access: req.body.access,
      ownerId: req.decoded.userId,
    })
      .then((newDocument) => {
        console.log(req.decoded);
        res.status(201).json({
          message: 'Document was created successfully',
          newDocument
        });
      })
      .catch(err => res.json({ err, message: 'error' }));
  },

  findDocument(req, res) {
    db.Documents.findOne({
      where: {
        id: req.params.id
      }
    }).then((document) => {
      if (!document) {
        return res.status(404)
        .send({ message: `Document ${req.params.id} cannot be found` });
      }
      res.status(200).send(document);
    });
  },

  findUsersDocuments(req, res) {
    db.Documents.findAll({ where: { ownerId: req.params.id } })
          .then(documents => res.status(200).send(documents));
  },

  update(req, res) {
    db.Documents
      .findById(req.params.id)
      .then((document) => {
        if (!document) {
          return res.status(404).send({
            message: 'Document Not Found',
          });
        }
        document
          .update(req.body, {
            fields: Object.keys(req.body)
          })
          .then(updateddocument => res.status(200).send(updateddocument));
      })
      .catch(err => res.status(400).send({
        message: err.errors
      }));
  },

  delete(req, res) {
    db.Documents.destroy({
      where: {
        id: req.params.id
      }
    })
      .then((document) => {
        if (!document) {
          return res.status(404).send({
            message: 'Document Not Found',
          });
        }
        res.status(200)
          .send({
            message: 'This document has been successfully deleted'
          });
      })
      .catch(err => res.status(500).send(err.errors));
  },

  findAllDocument(req, res) {
    const limit = req.query.limit || 10;
    const offset = req.query.offset || 0;
    db.Documents.findAll({ fields: [
      'title',
      'content',
      'access',
      'ownerId',
      'createdAt',
      'updatedAt'
    ],
      limit,
      offset })
      .then((document) => {
        if (document) {
          const condition = {
            count: document.count,
            limit,
            offset
          };
          const pagination = Helper.pagination(condition);
          res.status(200)
            .send({
              message: 'You have successfully users documents',
              document,
              pagination
            });
        }
      });
  },


  search(req, res) {
    const limit = req.query.limit || 3;
    const offset = req.query.offset || 0;
    const term = req.query.title;
    let condition = {};
    let pagination;
    const query = { fields: [
      'title',
      'content',
      'access',
      'ownerId',
      'createdAt',
      'updatedAt'
    ],
      limit,
      offset,
      where: {
        title: {
          $iLike: `%${term}%`
        }
      }
    };
    db.Documents.findAndCountAll(query)
      .then((document) => {
        condition = {
          count: document.count,
          limit,
          offset,
        };
        pagination = Helper.pagination(condition);
        res.status(200)
          .send({
            message: 'Your search was successful',
            document,
            pagination
          });
      });
  }
};

export default Document;
