import expect from 'expect';
import users from '../../reducers/users';

import { GET_USERS,
         CREATE_USERS,
         DELETE_USER,
         SET_SINGLE_USER } from '../../actions/types';

describe('Document Reducers', () => {
  it('should load all users when passed GET_USERS', () => {
    // arrange
    const state = [];
    const allUsers = {
      pagination: {
        page_count: 1,
        page: 1,
        page_size: 1,
        total_count: 1
      },
      message: 'Successfull',
      users: {
        count: 2,
        rows: [
          {
            id: 52,
            username: 'Ijay',
            fullNames: 'Ijay Ijay',
            email: 'ijay@gmail.com',
            roleId: 2,
            password: '$2a$10$zGMPA9UyromK20//JcWXYeb4ALQR0kIlDagHBr0grpVX60vRhepIu',
            createdAt: '2017-06-06T15:13:10.666Z',
            updatedAt: '2017-06-06T15:13:10.666Z'
          },
          {
            id: 26,
            username: 'page',
            fullNames: 'page intaion',
            email: 'page@gmail.com',
            roleId: 2,
            password: '$2a$10$uwQjfyn8PfZ22CXvXJTzcu9vh9F/5acGtG.3ow.qpqS3bE3z6Ds92',
            createdAt: '2017-05-31T20:30:32.106Z',
            updatedAt: '2017-05-31T20:30:32.106Z'
          },
        ] } };
    const expectedState =
      {
        pagination: {
          page_count: 1,
          page: 1,
          page_size: 1,
          total_count: 1
        },
        users: {
          count: 2,
          rows: [
            {
              id: 52,
              username: 'Ijay',
              fullNames: 'Ijay Ijay',
              email: 'ijay@gmail.com',
              roleId: 2,
              password: '$2a$10$zGMPA9UyromK20//JcWXYeb4ALQR0kIlDagHBr0grpVX60vRhepIu',
              createdAt: '2017-06-06T15:13:10.666Z',
              updatedAt: '2017-06-06T15:13:10.666Z'
            },
            {
              id: 26,
              username: 'page',
              fullNames: 'page intaion',
              email: 'page@gmail.com',
              roleId: 2,
              password: '$2a$10$uwQjfyn8PfZ22CXvXJTzcu9vh9F/5acGtG.3ow.qpqS3bE3z6Ds92',
              createdAt: '2017-05-31T20:30:32.106Z',
              updatedAt: '2017-05-31T20:30:32.106Z'
            },
          ] } };
    const action = { type: GET_USERS, payload: allUsers };

    // act
    const newState = users(state, action);

    expect(newState).toEqual(expectedState);
  });

  it('should create document when passed CREATE_USRES', () => {
    const initialState = {
      users: {
        count: 0,
        rows: []
      },
      user: {},
      pagination: {
        page_count: 0,
        page: 0,
        page_size: 0,
        total_count: 1
      }
    };

    const newUser = { username: 'Girlie',
      fullNames: 'Girlie role',
      email: 'girlie@gmail.com',
      password: '$2a$10$zGMPA9UyromK20//JcWXYeb4ALQR0kIlDagHBr0grpVX60vRhepIu',
      createdAt: '2017-06-06T15:13:10.666Z',
      updatedAt: '2017-06-06T15:13:10.666Z'
    };

    const expectedState =
      {
        pagination: {
          page_count: 0,
          page: 0,
          page_size: 0,
          total_count: 1
        },
        user: {},
        users: {
          rows: [
            {
              username: 'Girlie',
              email: 'girlie@gmail.com',
              fullNames: 'Girlie role',
              password: '$2a$10$zGMPA9UyromK20//JcWXYeb4ALQR0kIlDagHBr0grpVX60vRhepIu',
              createdAt: '2017-06-06T15:13:10.666Z',
              updatedAt: '2017-06-06T15:13:10.666Z'
            }
          ] } };
    const action = { type: CREATE_USERS, payload: newUser };
          // act
    const newState = users(initialState, action);
    expect(newState).toEqual(expectedState);
  });


  it('should load user when passed SET_SINGLE_USER', () => {
    // arrange
    const state = [];
    const allUsers = {
      pagination: {
        page_count: 1,
        page: 1,
        page_size: 1,
        total_count: 1
      },
      message: 'Successfull',
      users: {
        count: 1,
        rows: [
          {
            id: 52,
            username: 'Ijay',
            fullNames: 'Ijay Ijay',
            email: 'ijay@gmail.com',
            roleId: 2,
            password: '$2a$10$zGMPA9UyromK20//JcWXYeb4ALQR0kIlDagHBr0grpVX60vRhepIu',
            createdAt: '2017-06-06T15:13:10.666Z',
            updatedAt: '2017-06-06T15:13:10.666Z'
          },
        ] } };
    const expectedState =
      { user: {
        message: 'Successfull',
        pagination: {
          page_count: 1,
          page: 1,
          page_size: 1,
          total_count: 1
        },
        users: {
          count: 1,
          rows: [
            {
              id: 52,
              username: 'Ijay',
              fullNames: 'Ijay Ijay',
              email: 'ijay@gmail.com',
              roleId: 2,
              password: '$2a$10$zGMPA9UyromK20//JcWXYeb4ALQR0kIlDagHBr0grpVX60vRhepIu',
              createdAt: '2017-06-06T15:13:10.666Z',
              updatedAt: '2017-06-06T15:13:10.666Z'
            }
          ] } }
      };
    const action = { type: SET_SINGLE_USER, payload: allUsers };

    // act
    const newState = users(state, action);

    expect(newState).toEqual(expectedState);
  });


  it('should delete user when passed DELETE_USER', () => {
    // arrange
    const initialState = {
      pagination: {
        page_count: 1,
        page: 1,
        page_size: 1,
        total_count: 1
      },
      message: 'Successfull',
      users: {
        count: 2,
        rows: [
          {
            id: 52,
            username: 'Ijay',
            fullNames: 'Ijay Ijay',
            email: 'ijay@gmail.com',
            roleId: 2,
            password: '$2a$10$zGMPA9UyromK20//JcWXYeb4ALQR0kIlDagHBr0grpVX60vRhepIu',
            createdAt: '2017-06-06T15:13:10.666Z',
            updatedAt: '2017-06-06T15:13:10.666Z'
          },
          {
            id: 26,
            username: 'page',
            fullNames: 'page intaion',
            email: 'page@gmail.com',
            roleId: 2,
            password: '$2a$10$uwQjfyn8PfZ22CXvXJTzcu9vh9F/5acGtG.3ow.qpqS3bE3z6Ds92',
            createdAt: '2017-05-31T20:30:32.106Z',
            updatedAt: '2017-05-31T20:30:32.106Z'
          },
        ] } };
    const id = 26;
    const action = { type: DELETE_USER, id };

    const expectedState =
      {
        pagination: {
          page_count: 1,
          page: 1,
          page_size: 1,
          total_count: 1
        },
        message: 'Successfull',
        users: {
          rows:
          [{
            id: 52,
            username: 'Ijay',
            fullNames: 'Ijay Ijay',
            email: 'ijay@gmail.com',
            roleId: 2,
            password: '$2a$10$zGMPA9UyromK20//JcWXYeb4ALQR0kIlDagHBr0grpVX60vRhepIu',
            createdAt: '2017-06-06T15:13:10.666Z',
            updatedAt: '2017-06-06T15:13:10.666Z'
          }],
        } };

    // act
    const newState = users(initialState, action);

    expect(newState).toEqual(expectedState);
  });
});

