import db from '../models';

const Document = {
  create(req, res) {
    db.Documents.create(req.body)
      .then((newDocument) => {
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
        title: req.params.id
      }
    }).then((document) => {
      if (!document) {
        return res.status(404)
        .send({ message: `Document ${req.params.id} cannot be found` });
      }
      res.status(200).send(document);
    });
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
        title: req.params.id
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
    db.Documents.findAll({ fields: [
      'title',
      'content',
      'permission',
      'ownerId',
      'createdAt',
      'updatedAt'
    ] })
      .then(documentList => res.status(200).send(documentList));
  },

  pagination(req, res) {
    res.json({ message: 'welcome to pagination' });
  },

  search(req, res) {
    res.json({ message: 'welcome to search' });
  },
};

export default Document;
