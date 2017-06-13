import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect } from 'chai';
import nock from 'nock';
import * as actions from '../../../actions/usersAction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const singleUser = {
  id: 2,
  username: 'Ijay',
  fullNames: 'Ijay Ijay',
  email: 'ijay@gmail.com',
  roleId: 2,
  password: '$2a$10$zGMPA9UyromK20//JcWXYeb4ALQR0kIlDagHBr0grpVX60vRhepIu',
  createdAt: '2017-06-06T15:13:10.666Z',
  updatedAt: '2017-06-06T15:13:10.666Z',
};
const userInfo = {
  message: 'Successfull',
  users: {
    count: 2,
    rows: [
      {
        id: 2,
        username: 'Ijay',
        fullNames: 'Ijay Ijay',
        email: 'ijay@gmail.com',
        roleId: 2,
        password: '$2a$10$zGMPA9UyromK20//JcWXYeb4ALQR0kIlDagHBr0grpVX60vRhepIu',
        createdAt: '2017-06-06T15:13:10.666Z',
        updatedAt: '2017-06-06T15:13:10.666Z',
      },
      {
        id: 3,
        username: 'page',
        fullNames: 'page intaion',
        email: 'page@gmail.com',
        roleId: 2,
        password: '$2a$10$uwQjfyn8PfZ22CXvXJTzcu9vh9F/5acGtG.3ow.qpqS3bE3z6Ds92',
        createdAt: '2017-05-31T20:30:32.106Z',
        updatedAt: '2017-05-31T20:30:32.106Z',
      },
    ],
  },
  pagination: {
    page_count: 1,
    page: 1,
    page_size: 1,
    total_count: 2,
  },
};
describe('USERS ACTIONS', () => {
  after(() => {
    nock.cleanAll();
  });
  describe('Get Users', () => {
    const response = {
      userInfo,
    };
    it('should load users', () => {
      nock('http://localhost:80/')
        .get('/api/users?offset=0')
        .reply(200, response);

      const expectedActions = [
        { type: 'GET_USERS',
        },
      ];
      const store = mockStore({
        userInfo: {},
      });
      store.dispatch(actions.getUsers())
        .then(() => {
          expect(store.getActions()[0].type)
        .to.eql(expectedActions[0].type);
        });
    });
  });
  describe('Delete User By Id', () => {
    const id = singleUser.id;
    it('should delete document by id', () => {
      nock('http://localhost:80/')
        .delete(`/api/users/${id}`)
        .reply(200);

      const expectedActions = [
        { type: 'DELETE_USER',
        },
      ];
      const store = mockStore();
      store.dispatch(actions.deleteUser(id))
          .then(() => {
            expect(store.getActions()[0].type)
        .to.eql(expectedActions[0].type);
          });
    });
  });
  describe('Get Users By Id', () => {
    const response = {
      singleUser,
    };
    const id = singleUser.id;
    it('should get a single user', () => {
      nock('http://localhost:80/')
        .get(`/api/users/${id}`)
        .reply(200, response);

      const expectedActions = [
        { type: 'SET_SINGLE_USER',
        },
      ];
      const store = mockStore();
      store.dispatch(actions.getSingleUser(id))
          .then(() => {
            expect(store.getActions()[0].type)
        .to.eql(expectedActions[0].type);
          });
    });
  });
  describe('Update Users By Id ', () => {
    const response = {
      singleUser,
    };
    const id = singleUser.id;
    const updateUser = {
      id: 2,
      username: 'jed',
      fullNames: 'Ijay Ijay',
      email: 'ijay@gmail.com',
      roleId: 2,
      password: '$2a$10$zGMPA9UyromK20//JcWXYeb4ALQR0kIlDagHBr0grpVX60vRhepIu',
      createdAt: '2017-06-06T15:13:10.666Z',
      updatedAt: '2017-06-06T15:13:10.666Z',
    };
    it('should update user document', () => {
      nock('http://localhost:80/')
        .put('/api/users/2')
        .reply(200, response);

      const expectedActions = [
        { type: 'UPDATE_USER',
        },
      ];
      const store = mockStore();
      store.dispatch(actions.updateUser(updateUser, id))
          .then(() => {
            expect(store.getActions()[0].type)
        .to.eql(expectedActions[0].type);
          });
    });
  });
  describe('Search Through Users', () => {
    const response = {
      singleUser,
    };
    const searchUsers = {
      id: 3,
      username: 'page',
      fullNames: 'page intaion',
      email: 'page@gmail.com',
      roleId: 2,
      password: '$2a$10$uwQjfyn8PfZ22CXvXJTzcu9vh9F/5acGtG.3ow.qpqS3bE3z6Ds92',
      createdAt: '2017-05-31T20:30:32.106Z',
      updatedAt: '2017-05-31T20:30:32.106Z',
    };
    it('should search through users', () => {
      nock('http://localhost:80/')
        .get('/api/search/users?search=context&offset=0')
        .reply(200, response);

      const expectedActions = [
        { type: 'SEARCH_USERS',
        },
      ];
      const store = mockStore();
      store.dispatch(actions.searchUsers(searchUsers))
          .then(() => {
            expect(store.getActions()[0].type)
        .to.eql(expectedActions[0].type);
          });
    });
  });
});

