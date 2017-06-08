import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect } from 'chai';
import nock from 'nock';
import * as actions from '../../../actions/roleActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const createRole = {
  title: 'Printer'
};
const role = {
  id: 3,
  title: 'Printer'
};
const roleInfo = [
  {
    id: 1,
    title: 'admin'
  },
  {
    id: 2,
    title: 'regular'
  }
];
describe('ROLE ACTIONS', () => {
  after(() => {
    nock.cleanAll();
  });
  describe('Create Document', () => {
    const response = {
      title: createRole.title
    };
    it('should create a document', () => {
      nock('http://localhost:80/')
        .post('/api/roles', createRole)
        .reply(201, response);

      const expectedActions = [
        { type: 'CREATE_ROLE'
        }
      ];
      const store = mockStore({
        document: {},
      });
      store.dispatch(actions.createRole(createRole))
        .then(() => {
          expect(store.getActions()[0].type)
        .to.eql(expectedActions[0].type);
        });
    });
  });
  describe('Load Roles', () => {
    const response = {
      roles: roleInfo
    };
    it('should get all roles', () => {
      nock('http://localhost:80/')
        .get('/api/roles')
        .reply(200, response);

      const expectedActions = [
        { type: 'GET_ROLES'
        }
      ];
      const store = mockStore();
      store.dispatch(actions.getRoles())
          .then(() => {
            expect(store.getActions()[0].type)
        .to.eql(expectedActions[0].type);
          });
    });
  });
  describe('Delete Role By Id', () => {
    const response = {
      roles: role
    };
    const id = role.id;
    it('should delete role', () => {
      nock('http://localhost:80/')
        .delete(`/api/roles/${id}`)
        .reply(200, response);

      const expectedActions = [
        { type: 'DELETE_ROLES'
        }
      ];
      const store = mockStore();
      store.dispatch(actions.deleteRole(id))
          .then(() => {
            expect(store.getActions()[0].type)
        .to.eql(expectedActions[0].type);
          });
    });
  });
  describe('Update Roles By Id ', () => {
    const response = {
      roles: role
    };
    const id = role.id;
    const updateRole = {
      id: 3,
      title: 'Publisher'
    };
    it('should update role', () => {
      nock('http://localhost:80/')
        .put('/api/roles/3')
        .reply(200, response);

      const expectedActions = [
        { type: 'UPDATE_ROLES'
        }
      ];
      const store = mockStore();
      store.dispatch(actions.updateRole(updateRole, id))
          .then(() => {
            expect(store.getActions()[0].type)
        .to.eql(expectedActions[0].type);
          });
    });
  });
});

