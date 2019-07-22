import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect } from 'chai';
import nock from 'nock';
import * as actions from '../../../actions/loginActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const userData = {
  email: 'omokarofaith@gmail.com',
  password: 'random password',
};
const signupData = {
  email: 'bimba@gmail.com',
  password: 'qwerty',
  passwordConfirmation: 'qwerty',
  username: 'bimba',
  fullNames: 'Bimba Bimim',
};

describe('LOGIN ACTIONS', () => {
  after(() => {
    nock.cleanAll();
  });
  describe('login', () => {
    const response = {
      password: userData.password,
      email: userData.email,
    };
    after(() => {
      nock.cleanAll();
    });
    it('should login a user', () => {
      nock('/api')
        .post('/users/login', userData)
        .reply(200, response);

      const expectedActions = [
        { type: 'SET_CURRENT_USER',
          user: { email: 'omokarofaith@gmail.com',
            password: 'random password' } },
      ];
      const store = mockStore({
        userData: {},
      });
      store.dispatch(actions.setCurrentUser(userData));
      expect(store.getActions()[0].type)
        .to.eql(expectedActions[0].type);
    });
  });
  describe('SIGNUP ACTION', () => {
    const response = {
      firstNames: signupData.firstNames,
      username: signupData.username,
      email: signupData.email,
      password: signupData.password,
      passwordConfirmation: signupData.passwordConfirmation,
    };
    after(() => {
      nock.cleanAll();
    });
    it('should signup a user', () => {
      nock('/api')
        .post('/users', signupData)
        .reply(201, response);

      const expectedActions = [
        { type: 'SET_CURRENT_USER',
          user:
          { email: 'bimba@gmail.com',
            password: 'qwerty',
            passwordConfirmation: 'qwerty',
            username: 'bimba',
            fullNames: 'Bimba Bimim' } },
      ];
      const store = mockStore({
        user: {},
      });
      store.dispatch(actions.setCurrentUser(signupData));
      expect(store.getActions()[0].type)
        .to.eql(expectedActions[0].type);
    });
  });
});

