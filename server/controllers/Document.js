import db from '../models';

const Document = {
  create(req, res) {
    db.Document
      .create({
        title: req.body.title,
        content: req.body.content,
        access: req.body.access,
        ownerId: req.decoded.userId,
        typeId: req.body.typeId,
      })
      .then(document => res.status(201).send(document))
      .catch(() => res.status(400).send({
        message: 'An error occured. Ensure your parameters are valid!'
      }));
  },

  matchingInstances(req, res) {
    res.json({ message: 'welcome to matching Instances' });
  },

  findUser(req, res) {
    res.json({ message: 'welcome to finding users' });
  },

  update(req, res) {
    res.json({ message: 'welcome to update' });
  },

  delete(req, res) {
    res.json({ message: 'welcome to delete' });
  },

  findAll(req, res) {
    res.json({ message: 'welcome to fineAll' });
  },

  pagination(req, res) {
    res.json({ message: 'welcome to pagination' });
  },

  search(req, res) {
    res.json({ message: 'welcome to search' });
  }
};

export default Document;
