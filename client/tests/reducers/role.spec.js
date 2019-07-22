import expect from 'expect';
import roles from '../../reducers/roles';

import {
  CREATE_ROLE,
  GET_ROLES,
  DELETE_ROLES,
  UPDATE_ROLE
} from '../../actions/types';

describe('Roles Reducer', () => {
  it('should load all roles when passed GET_ROLES', () => {
    // arrange
    const state = [];
    const allRoles =
      [{ id: '1', title: 'admin' },
     { id: '2', title: 'regular' },
     { id: '3', title: 'basic' }];

    const expectedState =
      [{ id: '1', title: 'admin' },
     { id: '2', title: 'regular' },
     { id: '3', title: 'basic' }];
    const action = { type: GET_ROLES, payload: allRoles };

    // act
    const newState = roles(state, action);

    expect(newState).toEqual(expectedState);
  });

  it('should add role when passed CREATE_ROLE', () => {
    // arrange
    const initialState = [
      { title: 'admin' },
      { title: 'regular' }
    ];
    const newRole = { title: 'editor' };
    const action = { type: CREATE_ROLE, payload: newRole };

    const expectedState = [
      { title: 'admin' },
      { title: 'regular' },
      { title: 'editor' }
    ];

    // act
    const newState = roles(initialState, action);

    expect(newState).toEqual(expectedState);
  });

  it('should delete role when passed DELETE_ROLES', () => {
    // arrange
    const initialState = [
      { id: '1',
        title: 'admin'
      },
      { id: '2',
        title: 'regular',
      },
      { id: '3',
        title: 'editor',
      }
    ];
    const id = '3';
    const action = { type: DELETE_ROLES, id };

    const expectedState = [
      { id: '1',
        title: 'admin' },
      { id: '2',
        title: 'regular'
      },
    ];

    // act
    const newState = roles(initialState, action);

    expect(newState).toEqual(expectedState);
  });


  it('should update role when passed UPDATE_ROLE', () => {
    // arrange
    const initialState = [
      { id: '1',
        title: 'admin'
      },
      { id: '2',
        title: 'regular',
      },
      { id: '3',
        title: 'editor',
      }
    ];
    const updateRole = { id: '3', title: 'publisher' };
    const action = { type: UPDATE_ROLE, payload: updateRole };

    const expectedState = [
      { id: '1',
        title: 'admin' },
      { id: '2',
        title: 'regular'
      },
      { id: '3',
        title: 'editor'
      },
    ];

    // act
    const newState = roles(initialState, action);

    expect(newState).toEqual(expectedState);
  });
});
