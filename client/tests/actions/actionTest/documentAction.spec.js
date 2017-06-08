import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect } from 'chai';
import nock from 'nock';
import * as actions from '../../../actions/documentActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const userDocument = {
  title: 'My Diary',
  content: 'This is my diary',
  access: 'public'
};
const getSingleDoc = {
  id: 1,
  title: 'Enhanced context-sensitive structure',
  content: 'Doloremque consequuntur similique. Nihil eum sunt ut reiciendis quam dignissimos ex quia quos. Ut ea voluptate quas quia voluptates culpa doloribus. Reprehenderit ad et beatae eligendi maiores at aliquam qui asperiores. Voluptatem quos harum necessitatibus officiis vitae ratione asperiores architecto voluptate. Dolores odio reiciendis dignissimos nam et ut a.',
  access: 'public',
  createdAt: '2017-05-23T09:24:47.457Z',
  updatedAt: '2017-05-23T09:24'
};
const documentInfo = {
  documents: [
    {
      id: 1,
      title: 'Enhanced context-sensitive structure',
      content: 'Doloremque consequuntur similique. Nihil eum sunt ut reiciendis quam dignissimos ex quia quos. Ut ea voluptate quas quia voluptates culpa doloribus. Reprehenderit ad et beatae eligendi maiores at aliquam qui asperiores. Voluptatem quos harum necessitatibus officiis vitae ratione asperiores architecto voluptate. Dolores odio reiciendis dignissimos nam et ut a.',
      access: 'public',
      createdAt: '2017-05-23T09:24:47.457Z',
      updatedAt: '2017-05-23T09:24'
    },
    {
      id: 2,
      title: 'Enhanced context-sensitive structure',
      content: 'Doloremque consequuntur similique. Nihil eum sunt ut reiciendis quam dignissimos ex quia quos. Ut ea voluptate quas quia voluptates culpa doloribus. Reprehenderit ad et beatae eligendi maiores at aliquam qui asperiores. Voluptatem quos harum necessitatibus officiis vitae ratione asperiores architecto voluptate. Dolores odio reiciendis dignissimos nam et ut a.',
      access: 'public',
      createdAt: '2017-05-23T09:24:47.457Z',
      updatedAt: '2017-05-23T09:24'
    },
    {
      id: 3,
      title: 'Enhanced context-sensitive structure',
      content: 'Doloremque consequuntur similique. Nihil eum sunt ut reiciendis quam dignissimos ex quia quos. Ut ea voluptate quas quia voluptates culpa doloribus. Reprehenderit ad et beatae eligendi maiores at aliquam qui asperiores. Voluptatem quos harum necessitatibus officiis vitae ratione asperiores architecto voluptate. Dolores odio reiciendis dignissimos nam et ut a.',
      access: 'public',
      createdAt: '2017-05-23T09:24:47.457Z',
      updatedAt: '2017-05-23T09:24'
    }
  ],
  pagination: {
    page: 1,
    page_count: 1,
    page_size: 1,
    total_count: 3
  }
};
describe('DOCUMENT ACTIONS', () => {
  after(() => {
    nock.cleanAll();
  });
  describe('Create Document', () => {
    const response = {
      title: userDocument.title,
      content: userDocument.content,
      access: userDocument.access
    };
    it('should create a document', () => {
      nock('http://localhost:80/')
        .post('/api/documents', userDocument)
        .reply(201, response);

      const expectedActions = [
        { type: 'CREATE_DOCUMENT',
          document: { title: 'My Diary',
            content: 'This is my diary',
            access: 'public' }
        }
      ];
      const store = mockStore({
        document: {},
      });
      store.dispatch(actions.createDocument(userDocument))
        .then(() => {
          expect(store.getActions()[0].type)
        .to.eql(expectedActions[0].type);
        });
    });
  });
  describe('Load Documents', () => {
    const response = {
      documents: documentInfo.documents,
      pagination: documentInfo.pagination
    };
    it('should load all document', () => {
      nock('http://localhost:80/')
        .get('/api/documents?offset=0')
        .reply(200, response);

      const expectedActions = [
        { type: 'LOAD_DOCUMENTS'
        }
      ];
      const store = mockStore();
      store.dispatch(actions.loadDocuments())
          .then(() => {
            expect(store.getActions()[0].type)
        .to.eql(expectedActions[0].type);
          });
    });
  });
  describe('Get Document By Id', () => {
    const response = {
      documents: getSingleDoc
    };
    const id = getSingleDoc.id;
    it('should get a single document', () => {
      nock('http://localhost:80/')
        .get(`/api/documents/${id}`)
        .reply(200, response);

      const expectedActions = [
        { type: 'GET_SINGLE_DOCUMENT'
        }
      ];
      const store = mockStore();
      store.dispatch(actions.getDocument(id))
          .then(() => {
            expect(store.getActions()[0].type)
        .to.eql(expectedActions[0].type);
          });
    });
  });
  describe('Delete Document By Id', () => {
    const response = {
      documents: getSingleDoc
    };
    const id = getSingleDoc.id;
    it('should delete document by id', () => {
      nock('http://localhost:80/')
        .delete(`/api/documents/${id}`)
        .reply(200, response);

      const expectedActions = [
        { type: 'DELETE_DOCUMENT'
        }
      ];
      const store = mockStore();
      store.dispatch(actions.deleteDocument(id))
          .then(() => {
            expect(store.getActions()[0].type)
        .to.eql(expectedActions[0].type);
          });
    });
  });
  describe('Get Users Document By Id', () => {
    const response = {
      documents: getSingleDoc
    };
    const id = getSingleDoc.id;
    const offset = 0;
    it('should get a single document', () => {
      nock('http://localhost:80/')
        .get('/api/users/1/documents?offset=0')
        .reply(200, response);

      const expectedActions = [
        { type: 'USER_DOCUMENT'
        }
      ];
      const store = mockStore();
      store.dispatch(actions.usersDocument(offset, id))
          .then(() => {
            expect(store.getActions()[0].type)
        .to.eql(expectedActions[0].type);
          });
    });
  });
  describe('Update Users Document By Id ', () => {
    const response = {
      documents: getSingleDoc
    };
    const id = getSingleDoc.id;
    const updateDoc = {
      id: 1,
      title: 'context-sensitive structure',
      content: 'Doloremque consequuntur similique. Nihil eum sunt ut reiciendis quam dignissimos ex quia quos. Ut ea voluptate quas quia voluptates culpa doloribus. Reprehenderit ad et beatae eligendi maiores at aliquam qui asperiores. Voluptatem quos harum necessitatibus officiis vitae ratione asperiores architecto voluptate. Dolores odio reiciendis dignissimos nam et ut a.',
      access: 'public',
      createdAt: '2017-05-23T09:24:47.457Z',
      updatedAt: '2017-05-23T09:24'
    };
    it('should update user document', () => {
      nock('http://localhost:80/')
        .put('/api/documents/1')
        .reply(200, response);

      const expectedActions = [
        { type: 'UPDATE_DOCUMENT'
        }
      ];
      const store = mockStore();
      store.dispatch(actions.updateDocument(updateDoc, id))
          .then(() => {
            expect(store.getActions()[0].type)
        .to.eql(expectedActions[0].type);
          });
    });
  });
  describe('Search Users Document ', () => {
    const response = {
      documents: getSingleDoc
    };
    const searchDoc = {
      id: 1,
      title: 'context-sensitive structure',
      content: 'Doloremque consequuntur similique. Nihil eum sunt ut reiciendis quam dignissimos ex quia quos. Ut ea voluptate quas quia voluptates culpa doloribus. Reprehenderit ad et beatae eligendi maiores at aliquam qui asperiores. Voluptatem quos harum necessitatibus officiis vitae ratione asperiores architecto voluptate. Dolores odio reiciendis dignissimos nam et ut a.',
      access: 'public',
      createdAt: '2017-05-23T09:24:47.457Z',
      updatedAt: '2017-05-23T09:24'
    };
    it('should search documents', () => {
      nock('http://localhost:80/')
        .get('/api/search/documents?search=context&offset=0')
        .reply(200, response);

      const expectedActions = [
        { type: 'SEARCH_DOCUMENT'
        }
      ];
      const store = mockStore();
      store.dispatch(actions.searchDocument(searchDoc))
          .then(() => {
            expect(store.getActions()[0].type)
        .to.eql(expectedActions[0].type);
          });
    });
  });
});

