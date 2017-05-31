import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import nock from 'nock';
import * as actions from '../../actions/usersAction';
import * as types from '../../actions/types';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('async actions', () => {
  let userData;
  beforeAll(() => {
    userData = {
      fullNames: 'Solomon Paul',
      username: 'paul@gmail.com',
      email: 'paul@gmail.com',
      password: 'qwerty',
      roleId: 2
    };
  });
  afterEach(() => {
    nock.cleanAll();
  });

  describe('CREATE USERS', () => {
    it('creates users when axios dispatch has been done', () => {
      nock.post('/api/users/', userData)
      .reply(200, { message: 'User Created Successfully' });
      const expectedActions = { type: types.CREATE_USERS, userData };
      const store = mockStore({ createUser: {} });

      return store.dispatch(actions.createUsers(userData))
      .then((res) => { // return of async actions
        expect(store.createUsers(res)).toEqual(expectedActions);
      });
    });
  });
});

// describe('User Actions', () => {
//   describe('CREATE USERS', () => {
//     it('should create a CREATE_USERS action', (done) => {
//       const user = {
//         fullNames: 'Solomon Paul',
//         username: 'paul@gmail.com',
//         email: 'paul@gmail.com',
//         password: 'qwerty',
//         roleId: 2
//       };
//       const expectedAction = {
//         type: types.CREATE_USERS,
//         user
//       };
//       const action = actions.createUsers(user);
//       expect(action).toEqual(expectedAction);
//       done();
//     });
//   });
// });
