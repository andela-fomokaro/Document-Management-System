const Document = {
  create(req, res) {
    res.json({ message: 'welcome to create Document' });
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
