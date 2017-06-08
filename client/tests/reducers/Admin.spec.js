import expect from 'expect';
import reducers from '../../reducers/users';

describe('Admin Reducers', () => {
  it('should handle UPDATE_USER actions', () => {
    const state = reducers({
      users: {
        user: {
          id: 12,
          username: 'ajoke',
          fullNames: 'ajoke anike',
          email: 'ajoke@gmail.com',
          roleId: 4,
          password: '$2a$10$0n5mkKuizSI0DiLt2BuxE.v8B2FGRKn90BdOc/L3I/hsplBimxWvS',
          createdAt: '2017-05-31T20:08:00.805Z',
          updatedAt: '2017-06-06T12:25:31.761Z'
        }
      }
    });
    expect(state).toEqual({
      users: {
        user: {
          id: 12,
          username: 'ajoke',
          fullNames: 'ajoke anike',
          email: 'ajoke@gmail.com',
          roleId: 4,
          password: '$2a$10$0n5mkKuizSI0DiLt2BuxE.v8B2FGRKn90BdOc/L3I/hsplBimxWvS',
          createdAt: '2017-05-31T20:08:00.805Z',
          updatedAt: '2017-06-06T12:25:31.761Z'
        }
      }
    });
  });

  it('should handle DELETE_USER actions', () => {
    const state = reducers({
      type: 'DELETE_USER',
      id: 12
    });
    expect(state).toEqual({
      id: 12,
      type: 'DELETE_USER'
    });
  });

  it('should handle CREATE_USER actions', () => {
    const state = reducers({
      documents: {
        documents: [],
        pagination: {}
      },
      login: {
        isAunthenticated: true,
        user: {
          userId: 1,
          roleId: 1,
          iat: 1496750518,
          exp: 1497355318
        }
      },
      roles: [
        {
          id: 1,
          title: 'admin',
          read: null,
          write: null,
          delete: null,
          createdAt: '2017-05-23T09:24:46.705Z',
          updatedAt: '2017-05-23T09:24:46.705Z'
        },
        {
          id: 2,
          title: 'regular',
          read: null,
          write: null,
          delete: null,
          createdAt: '2017-05-23T09:24:46.705Z',
          updatedAt: '2017-05-23T09:24:46.705Z'
        },
        {
          id: 3,
          title: 'Author',
          read: false,
          write: false,
          delete: false,
          createdAt: '2017-05-29T15:56:39.202Z',
          updatedAt: '2017-05-29T15:56:39.202Z'
        },
        {
          id: 4,
          title: 'Printer',
          read: false,
          write: false,
          delete: false,
          createdAt: '2017-05-29T15:59:11.109Z',
          updatedAt: '2017-05-29T15:59:11.109Z'
        }
      ],
      users: {
        users: {
          rows: [
            {
              id: 3,
              username: 'gaye',
              fullNames: 'gaye',
              email: 'gaye@gmail.com',
              roleId: 3,
              password: '$2a$10$rrfP24A.JInpljqaj.y7DO2/YbCf3.LQ0XU0QVWyieOM0EpRYcUoy',
              createdAt: '2017-05-28T21:26:12.290Z',
              updatedAt: '2017-06-06T12:13:35.760Z'
            },
            {
              id: 2,
              username: 'Kenny',
              fullNames: 'Bakare Kehinde',
              email: 'noxyblaze@gmail.com',
              roleId: 3,
              password: '$2a$08$VlWprHmJC9K7wNgVuPkQmO/Yxw7akPdpu/psaiJq5J/p5otQ3rL/O',
              createdAt: '2017-05-23T09:24:46.840Z',
              updatedAt: '2017-06-01T11:10:44.235Z'
            },
            {
              id: 24,
              username: 'dido',
              fullNames: 'ajoke anif',
              email: 'dido@gmail.com',
              roleId: 2,
              password: '$2a$10$ceqwCdc7KsCbJenQNPEWiOlxA/gf0Gj4XuGBZHFQsb/nKHXRK5zVa',
              createdAt: '2017-05-31T20:17:32.141Z',
              updatedAt: '2017-05-31T20:17:32.141Z'
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
            {
              id: 27,
              username: 'lola',
              fullNames: 'lola rae',
              email: 'lolarae@gmail.com',
              roleId: 2,
              password: '$2a$10$/RIaZMFayCZeEZOb/Bc/auyZoblR35LZgKFfBvc9Ki0XRNCRpFKJ6',
              createdAt: '2017-05-31T20:31:49.713Z',
              updatedAt: '2017-05-31T20:31:49.713Z'
            },
            {
              id: 12,
              username: 'ajoke',
              fullNames: 'ajoke anike',
              email: 'ajoke@gmail.com',
              roleId: 4,
              password: '$2a$10$0n5mkKuizSI0DiLt2BuxE.v8B2FGRKn90BdOc/L3I/hsplBimxWvS',
              createdAt: '2017-05-31T20:08:00.805Z',
              updatedAt: '2017-06-06T12:25:31.761Z'
            },
          ]
        },
        user: {
          id: 12,
          username: 'ajoke',
          fullNames: 'ajoke anike',
          email: 'ajoke@gmail.com',
          roleId: 4,
          password: '$2a$10$0n5mkKuizSI0DiLt2BuxE.v8B2FGRKn90BdOc/L3I/hsplBimxWvS',
          createdAt: '2017-05-31T20:08:00.805Z',
          updatedAt: '2017-06-06T12:25:31.761Z'
        },
        pagination: {
          page_count: 4,
          page: 1,
          page_size: 6,
          total_count: 23
        }
      },
      type: 'CREATE_USERS',
      payload: {
        roleId: 2,
        id: 52,
        username: 'Ijay',
        email: 'ijay@gmail.com',
        password: '$2a$10$zGMPA9UyromK20//JcWXYeb4ALQR0kIlDagHBr0grpVX60vRhepIu',
        fullNames: 'Ijay Ijay',
        updatedAt: '2017-06-06T15:13:10.666Z',
        createdAt: '2017-06-06T15:13:10.666Z'
      }
    });
    expect(state).toEqual({
      documents: {
        documents: [],
        pagination: {}
      },
      payload: {
        roleId: 2,
        id: 52,
        username: 'Ijay',
        email: 'ijay@gmail.com',
        password: '$2a$10$zGMPA9UyromK20//JcWXYeb4ALQR0kIlDagHBr0grpVX60vRhepIu',
        fullNames: 'Ijay Ijay',
        updatedAt: '2017-06-06T15:13:10.666Z',
        createdAt: '2017-06-06T15:13:10.666Z'
      },
      login: {
        isAunthenticated: true,
        user: {
          userId: 1,
          roleId: 1,
          iat: 1496750518,
          exp: 1497355318
        } },
      roles: [
        {
          id: 1,
          title: 'admin',
          read: null,
          write: null,
          delete: null,
          createdAt: '2017-05-23T09:24:46.705Z',
          updatedAt: '2017-05-23T09:24:46.705Z'
        },
        {
          id: 2,
          title: 'regular',
          read: null,
          write: null,
          delete: null,
          createdAt: '2017-05-23T09:24:46.705Z',
          updatedAt: '2017-05-23T09:24:46.705Z'
        },
        {
          id: 3,
          title: 'Author',
          read: false,
          write: false,
          delete: false,
          createdAt: '2017-05-29T15:56:39.202Z',
          updatedAt: '2017-05-29T15:56:39.202Z'
        },
        {
          id: 4,
          title: 'Printer',
          read: false,
          write: false,
          delete: false,
          createdAt: '2017-05-29T15:59:11.109Z',
          updatedAt: '2017-05-29T15:59:11.109Z'
        }
      ],
      type: 'CREATE_USERS',
      users: {
        users: {
          rows: [
            {
              id: 3,
              username: 'gaye',
              fullNames: 'gaye',
              email: 'gaye@gmail.com',
              roleId: 3,
              password: '$2a$10$rrfP24A.JInpljqaj.y7DO2/YbCf3.LQ0XU0QVWyieOM0EpRYcUoy',
              createdAt: '2017-05-28T21:26:12.290Z',
              updatedAt: '2017-06-06T12:13:35.760Z'
            },
            {
              id: 2,
              username: 'Kenny',
              fullNames: 'Bakare Kehinde',
              email: 'noxyblaze@gmail.com',
              roleId: 3,
              password: '$2a$08$VlWprHmJC9K7wNgVuPkQmO/Yxw7akPdpu/psaiJq5J/p5otQ3rL/O',
              createdAt: '2017-05-23T09:24:46.840Z',
              updatedAt: '2017-06-01T11:10:44.235Z'
            },
            {
              id: 24,
              username: 'dido',
              fullNames: 'ajoke anif',
              email: 'dido@gmail.com',
              roleId: 2,
              password: '$2a$10$ceqwCdc7KsCbJenQNPEWiOlxA/gf0Gj4XuGBZHFQsb/nKHXRK5zVa',
              createdAt: '2017-05-31T20:17:32.141Z',
              updatedAt: '2017-05-31T20:17:32.141Z'
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
            {
              id: 27,
              username: 'lola',
              fullNames: 'lola rae',
              email: 'lolarae@gmail.com',
              roleId: 2,
              password: '$2a$10$/RIaZMFayCZeEZOb/Bc/auyZoblR35LZgKFfBvc9Ki0XRNCRpFKJ6',
              createdAt: '2017-05-31T20:31:49.713Z',
              updatedAt: '2017-05-31T20:31:49.713Z'
            },
            {
              id: 12,
              username: 'ajoke',
              fullNames: 'ajoke anike',
              email: 'ajoke@gmail.com',
              roleId: 4,
              password: '$2a$10$0n5mkKuizSI0DiLt2BuxE.v8B2FGRKn90BdOc/L3I/hsplBimxWvS',
              createdAt: '2017-05-31T20:08:00.805Z',
              updatedAt: '2017-06-06T12:25:31.761Z'
            },
          ]
        },
        user: {
          id: 12,
          username: 'ajoke',
          fullNames: 'ajoke anike',
          email: 'ajoke@gmail.com',
          roleId: 4,
          password: '$2a$10$0n5mkKuizSI0DiLt2BuxE.v8B2FGRKn90BdOc/L3I/hsplBimxWvS',
          createdAt: '2017-05-31T20:08:00.805Z',
          updatedAt: '2017-06-06T12:25:31.761Z'
        },
        pagination: {
          page_count: 4,
          page: 1,
          page_size: 6,
          total_count: 23
        }
      }
    });
  });

  it('should handle GET_USERS actions', () => {
    const state = reducers({
      documents: {
        documents: [],
        pagination: {}
      },
      login: {
        isAunthenticated: true,
        user: {
          userId: 1,
          roleId: 1,
          iat: 1496750518,
          exp: 1497355318
        }
      },
      roles: [
        {
          id: 1,
          title: 'admin',
          read: null,
          write: null,
          delete: null,
          createdAt: '2017-05-23T09:24:46.705Z',
          updatedAt: '2017-05-23T09:24:46.705Z'
        },
        {
          id: 2,
          title: 'regular',
          read: null,
          write: null,
          delete: null,
          createdAt: '2017-05-23T09:24:46.705Z',
          updatedAt: '2017-05-23T09:24:46.705Z'
        },
        {
          id: 3,
          title: 'Author',
          read: false,
          write: false,
          delete: false,
          createdAt: '2017-05-29T15:56:39.202Z',
          updatedAt: '2017-05-29T15:56:39.202Z'
        },
        {
          id: 4,
          title: 'Printer',
          read: false,
          write: false,
          delete: false,
          createdAt: '2017-05-29T15:59:11.109Z',
          updatedAt: '2017-05-29T15:59:11.109Z'
        }
      ],
      users: {
        users: {
          rows: [
            {
              id: 3,
              username: 'gaye',
              fullNames: 'gaye',
              email: 'gaye@gmail.com',
              roleId: 3,
              password: '$2a$10$rrfP24A.JInpljqaj.y7DO2/YbCf3.LQ0XU0QVWyieOM0EpRYcUoy',
              createdAt: '2017-05-28T21:26:12.290Z',
              updatedAt: '2017-06-06T12:13:35.760Z'
            },
            {
              id: 2,
              username: 'Kenny',
              fullNames: 'Bakare Kehinde',
              email: 'noxyblaze@gmail.com',
              roleId: 3,
              password: '$2a$08$VlWprHmJC9K7wNgVuPkQmO/Yxw7akPdpu/psaiJq5J/p5otQ3rL/O',
              createdAt: '2017-05-23T09:24:46.840Z',
              updatedAt: '2017-06-01T11:10:44.235Z'
            },
            {
              id: 24,
              username: 'dido',
              fullNames: 'ajoke anif',
              email: 'dido@gmail.com',
              roleId: 2,
              password: '$2a$10$ceqwCdc7KsCbJenQNPEWiOlxA/gf0Gj4XuGBZHFQsb/nKHXRK5zVa',
              createdAt: '2017-05-31T20:17:32.141Z',
              updatedAt: '2017-05-31T20:17:32.141Z'
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
            {
              id: 27,
              username: 'lola',
              fullNames: 'lola rae',
              email: 'lolarae@gmail.com',
              roleId: 2,
              password: '$2a$10$/RIaZMFayCZeEZOb/Bc/auyZoblR35LZgKFfBvc9Ki0XRNCRpFKJ6',
              createdAt: '2017-05-31T20:31:49.713Z',
              updatedAt: '2017-05-31T20:31:49.713Z'
            },
            {
              id: 12,
              username: 'ajoke',
              fullNames: 'ajoke anike',
              email: 'ajoke@gmail.com',
              roleId: 4,
              password: '$2a$10$0n5mkKuizSI0DiLt2BuxE.v8B2FGRKn90BdOc/L3I/hsplBimxWvS',
              createdAt: '2017-05-31T20:08:00.805Z',
              updatedAt: '2017-06-06T12:25:31.761Z'
            },
          ]
        },
        user: {
          id: 12,
          username: 'ajoke',
          fullNames: 'ajoke anike',
          email: 'ajoke@gmail.com',
          roleId: 4,
          password: '$2a$10$0n5mkKuizSI0DiLt2BuxE.v8B2FGRKn90BdOc/L3I/hsplBimxWvS',
          createdAt: '2017-05-31T20:08:00.805Z',
          updatedAt: '2017-06-06T12:25:31.761Z'
        },
        pagination: {
          page_count: 4,
          page: 1,
          page_size: 6,
          total_count: 23
        }
      },
      type: 'GET_USERS',
      payload: {
        message: 'Successfull',
        users: {
          count: 23,
          rows: [
            {
              id: 3,
              username: 'gaye',
              fullNames: 'gaye',
              email: 'gaye@gmail.com',
              roleId: 3,
              password: '$2a$10$rrfP24A.JInpljqaj.y7DO2/YbCf3.LQ0XU0QVWyieOM0EpRYcUoy',
              createdAt: '2017-05-28T21:26:12.290Z',
              updatedAt: '2017-06-06T12:13:35.760Z'
            },
            {
              id: 2,
              username: 'Kenny',
              fullNames: 'Bakare Kehinde',
              email: 'noxyblaze@gmail.com',
              roleId: 3,
              password: '$2a$08$VlWprHmJC9K7wNgVuPkQmO/Yxw7akPdpu/psaiJq5J/p5otQ3rL/O',
              createdAt: '2017-05-23T09:24:46.840Z',
              updatedAt: '2017-06-01T11:10:44.235Z'
            },
            {
              id: 24,
              username: 'dido',
              fullNames: 'ajoke anif',
              email: 'dido@gmail.com',
              roleId: 2,
              password: '$2a$10$ceqwCdc7KsCbJenQNPEWiOlxA/gf0Gj4XuGBZHFQsb/nKHXRK5zVa',
              createdAt: '2017-05-31T20:17:32.141Z',
              updatedAt: '2017-05-31T20:17:32.141Z'
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
            {
              id: 27,
              username: 'lola',
              fullNames: 'lola rae',
              email: 'lolarae@gmail.com',
              roleId: 2,
              password: '$2a$10$/RIaZMFayCZeEZOb/Bc/auyZoblR35LZgKFfBvc9Ki0XRNCRpFKJ6',
              createdAt: '2017-05-31T20:31:49.713Z',
              updatedAt: '2017-05-31T20:31:49.713Z'
            },
            {
              id: 12,
              username: 'ajoke',
              fullNames: 'ajoke anike',
              email: 'ajoke@gmail.com',
              roleId: 4,
              password: '$2a$10$0n5mkKuizSI0DiLt2BuxE.v8B2FGRKn90BdOc/L3I/hsplBimxWvS',
              createdAt: '2017-05-31T20:08:00.805Z',
              updatedAt: '2017-06-06T12:25:31.761Z'
            },
          ],
          pagination: {
            page_count: 4,
            page: 1,
            page_size: 6,
            total_count: 23
          }
        }
      }
    });
    expect(state).toEqual({
      documents: {
        documents: [],
        pagination: {}
      },
      payload: {
        message: 'Successfull',
        users: {
          count: 23,
          rows: [
            {
              id: 3,
              username: 'gaye',
              fullNames: 'gaye',
              email: 'gaye@gmail.com',
              roleId: 3,
              password: '$2a$10$rrfP24A.JInpljqaj.y7DO2/YbCf3.LQ0XU0QVWyieOM0EpRYcUoy',
              createdAt: '2017-05-28T21:26:12.290Z',
              updatedAt: '2017-06-06T12:13:35.760Z'
            },
            {
              id: 2,
              username: 'Kenny',
              fullNames: 'Bakare Kehinde',
              email: 'noxyblaze@gmail.com',
              roleId: 3,
              password: '$2a$08$VlWprHmJC9K7wNgVuPkQmO/Yxw7akPdpu/psaiJq5J/p5otQ3rL/O',
              createdAt: '2017-05-23T09:24:46.840Z',
              updatedAt: '2017-06-01T11:10:44.235Z'
            },
            {
              id: 24,
              username: 'dido',
              fullNames: 'ajoke anif',
              email: 'dido@gmail.com',
              roleId: 2,
              password: '$2a$10$ceqwCdc7KsCbJenQNPEWiOlxA/gf0Gj4XuGBZHFQsb/nKHXRK5zVa',
              createdAt: '2017-05-31T20:17:32.141Z',
              updatedAt: '2017-05-31T20:17:32.141Z'
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
            {
              id: 27,
              username: 'lola',
              fullNames: 'lola rae',
              email: 'lolarae@gmail.com',
              roleId: 2,
              password: '$2a$10$/RIaZMFayCZeEZOb/Bc/auyZoblR35LZgKFfBvc9Ki0XRNCRpFKJ6',
              createdAt: '2017-05-31T20:31:49.713Z',
              updatedAt: '2017-05-31T20:31:49.713Z'
            },
            {
              id: 12,
              username: 'ajoke',
              fullNames: 'ajoke anike',
              email: 'ajoke@gmail.com',
              roleId: 4,
              password: '$2a$10$0n5mkKuizSI0DiLt2BuxE.v8B2FGRKn90BdOc/L3I/hsplBimxWvS',
              createdAt: '2017-05-31T20:08:00.805Z',
              updatedAt: '2017-06-06T12:25:31.761Z'
            },
          ],
          pagination: {
            page_count: 4,
            page: 1,
            page_size: 6,
            total_count: 23
          }
        }
      },
      login: {
        isAunthenticated: true,
        user: {
          userId: 1,
          roleId: 1,
          iat: 1496750518,
          exp: 1497355318
        } },
      roles: [
        {
          id: 1,
          title: 'admin',
          read: null,
          write: null,
          delete: null,
          createdAt: '2017-05-23T09:24:46.705Z',
          updatedAt: '2017-05-23T09:24:46.705Z'
        },
        {
          id: 2,
          title: 'regular',
          read: null,
          write: null,
          delete: null,
          createdAt: '2017-05-23T09:24:46.705Z',
          updatedAt: '2017-05-23T09:24:46.705Z'
        },
        {
          id: 3,
          title: 'Author',
          read: false,
          write: false,
          delete: false,
          createdAt: '2017-05-29T15:56:39.202Z',
          updatedAt: '2017-05-29T15:56:39.202Z'
        },
        {
          id: 4,
          title: 'Printer',
          read: false,
          write: false,
          delete: false,
          createdAt: '2017-05-29T15:59:11.109Z',
          updatedAt: '2017-05-29T15:59:11.109Z'
        }
      ],
      type: 'GET_USERS',
      users: {
        users: {
          rows: [
            {
              id: 3,
              username: 'gaye',
              fullNames: 'gaye',
              email: 'gaye@gmail.com',
              roleId: 3,
              password: '$2a$10$rrfP24A.JInpljqaj.y7DO2/YbCf3.LQ0XU0QVWyieOM0EpRYcUoy',
              createdAt: '2017-05-28T21:26:12.290Z',
              updatedAt: '2017-06-06T12:13:35.760Z'
            },
            {
              id: 2,
              username: 'Kenny',
              fullNames: 'Bakare Kehinde',
              email: 'noxyblaze@gmail.com',
              roleId: 3,
              password: '$2a$08$VlWprHmJC9K7wNgVuPkQmO/Yxw7akPdpu/psaiJq5J/p5otQ3rL/O',
              createdAt: '2017-05-23T09:24:46.840Z',
              updatedAt: '2017-06-01T11:10:44.235Z'
            },
            {
              id: 24,
              username: 'dido',
              fullNames: 'ajoke anif',
              email: 'dido@gmail.com',
              roleId: 2,
              password: '$2a$10$ceqwCdc7KsCbJenQNPEWiOlxA/gf0Gj4XuGBZHFQsb/nKHXRK5zVa',
              createdAt: '2017-05-31T20:17:32.141Z',
              updatedAt: '2017-05-31T20:17:32.141Z'
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
            {
              id: 27,
              username: 'lola',
              fullNames: 'lola rae',
              email: 'lolarae@gmail.com',
              roleId: 2,
              password: '$2a$10$/RIaZMFayCZeEZOb/Bc/auyZoblR35LZgKFfBvc9Ki0XRNCRpFKJ6',
              createdAt: '2017-05-31T20:31:49.713Z',
              updatedAt: '2017-05-31T20:31:49.713Z'
            },
            {
              id: 12,
              username: 'ajoke',
              fullNames: 'ajoke anike',
              email: 'ajoke@gmail.com',
              roleId: 4,
              password: '$2a$10$0n5mkKuizSI0DiLt2BuxE.v8B2FGRKn90BdOc/L3I/hsplBimxWvS',
              createdAt: '2017-05-31T20:08:00.805Z',
              updatedAt: '2017-06-06T12:25:31.761Z'
            },
          ]
        },
        user: {
          id: 12,
          username: 'ajoke',
          fullNames: 'ajoke anike',
          email: 'ajoke@gmail.com',
          roleId: 4,
          password: '$2a$10$0n5mkKuizSI0DiLt2BuxE.v8B2FGRKn90BdOc/L3I/hsplBimxWvS',
          createdAt: '2017-05-31T20:08:00.805Z',
          updatedAt: '2017-06-06T12:25:31.761Z'
        },
        pagination: {
          page_count: 4,
          page: 1,
          page_size: 6,
          total_count: 23
        }
      }
    });
  });
  it('should handle SEARCH_USERS actions', () => {
    const state = reducers({
      documents: {
        documents: [],
        pagination: {}
      },
      login: {
        isAunthenticated: true,
        user: {
          userId: 1,
          roleId: 1,
          iat: 1496750518,
          exp: 1497355318
        }
      },
      roles: [
        {
          id: 1,
          title: 'admin',
          read: null,
          write: null,
          delete: null,
          createdAt: '2017-05-23T09:24:46.705Z',
          updatedAt: '2017-05-23T09:24:46.705Z'
        },
        {
          id: 2,
          title: 'regular',
          read: null,
          write: null,
          delete: null,
          createdAt: '2017-05-23T09:24:46.705Z',
          updatedAt: '2017-05-23T09:24:46.705Z'
        },
        {
          id: 3,
          title: 'Author',
          read: false,
          write: false,
          delete: false,
          createdAt: '2017-05-29T15:56:39.202Z',
          updatedAt: '2017-05-29T15:56:39.202Z'
        },
        {
          id: 4,
          title: 'Printer',
          read: false,
          write: false,
          delete: false,
          createdAt: '2017-05-29T15:59:11.109Z',
          updatedAt: '2017-05-29T15:59:11.109Z'
        }
      ],
      users: {
        users: {
          rows: [
            {
              id: 3,
              username: 'gaye',
              fullNames: 'gaye',
              email: 'gaye@gmail.com',
              roleId: 3,
              password: '$2a$10$rrfP24A.JInpljqaj.y7DO2/YbCf3.LQ0XU0QVWyieOM0EpRYcUoy',
              createdAt: '2017-05-28T21:26:12.290Z',
              updatedAt: '2017-06-06T12:13:35.760Z'
            },
            {
              id: 2,
              username: 'Kenny',
              fullNames: 'Bakare Kehinde',
              email: 'noxyblaze@gmail.com',
              roleId: 3,
              password: '$2a$08$VlWprHmJC9K7wNgVuPkQmO/Yxw7akPdpu/psaiJq5J/p5otQ3rL/O',
              createdAt: '2017-05-23T09:24:46.840Z',
              updatedAt: '2017-06-01T11:10:44.235Z'
            },
            {
              id: 24,
              username: 'dido',
              fullNames: 'ajoke anif',
              email: 'dido@gmail.com',
              roleId: 2,
              password: '$2a$10$ceqwCdc7KsCbJenQNPEWiOlxA/gf0Gj4XuGBZHFQsb/nKHXRK5zVa',
              createdAt: '2017-05-31T20:17:32.141Z',
              updatedAt: '2017-05-31T20:17:32.141Z'
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
            {
              id: 27,
              username: 'lola',
              fullNames: 'lola rae',
              email: 'lolarae@gmail.com',
              roleId: 2,
              password: '$2a$10$/RIaZMFayCZeEZOb/Bc/auyZoblR35LZgKFfBvc9Ki0XRNCRpFKJ6',
              createdAt: '2017-05-31T20:31:49.713Z',
              updatedAt: '2017-05-31T20:31:49.713Z'
            },
            {
              id: 12,
              username: 'ajoke',
              fullNames: 'ajoke anike',
              email: 'ajoke@gmail.com',
              roleId: 4,
              password: '$2a$10$0n5mkKuizSI0DiLt2BuxE.v8B2FGRKn90BdOc/L3I/hsplBimxWvS',
              createdAt: '2017-05-31T20:08:00.805Z',
              updatedAt: '2017-06-06T12:25:31.761Z'
            },
          ]
        },
        user: {
          id: 12,
          username: 'ajoke',
          fullNames: 'ajoke anike',
          email: 'ajoke@gmail.com',
          roleId: 4,
          password: '$2a$10$0n5mkKuizSI0DiLt2BuxE.v8B2FGRKn90BdOc/L3I/hsplBimxWvS',
          createdAt: '2017-05-31T20:08:00.805Z',
          updatedAt: '2017-06-06T12:25:31.761Z'
        },
        pagination: {
          page_count: 4,
          page: 1,
          page_size: 6,
          total_count: 23
        }
      },
      type: 'SEARCH_USERS',
      payload: {
        message: 'Your search was successful',
        users: {
          count: 1,
          rows: [
            {
              id: 3,
              username: 'gaye',
              fullNames: 'gaye',
              email: 'gaye@gmail.com',
              roleId: 3,
              password: '$2a$10$rrfP24A.JInpljqaj.y7DO2/YbCf3.LQ0XU0QVWyieOM0EpRYcUoy',
              createdAt: '2017-05-28T21:26:12.290Z',
              updatedAt: '2017-06-06T12:13:35.760Z'
            }
          ],
          pagination: {
            page_count: 1,
            page: 1,
            page_size: 1,
            total_count: 1
          }
        }
      }
    });
    expect(state).toEqual({
      documents: {
        documents: [],
        pagination: {}
      },
      payload: {
        message: 'Your search was successful',
        users: {
          count: 1,
          rows: [
            {
              id: 3,
              username: 'gaye',
              fullNames: 'gaye',
              email: 'gaye@gmail.com',
              roleId: 3,
              password: '$2a$10$rrfP24A.JInpljqaj.y7DO2/YbCf3.LQ0XU0QVWyieOM0EpRYcUoy',
              createdAt: '2017-05-28T21:26:12.290Z',
              updatedAt: '2017-06-06T12:13:35.760Z'
            }
          ],
          pagination: {
            page_count: 1,
            page: 1,
            page_size: 1,
            total_count: 1
          }
        }
      },
      login: {
        isAunthenticated: true,
        user: {
          userId: 1,
          roleId: 1,
          iat: 1496750518,
          exp: 1497355318
        } },
      roles: [
        {
          id: 1,
          title: 'admin',
          read: null,
          write: null,
          delete: null,
          createdAt: '2017-05-23T09:24:46.705Z',
          updatedAt: '2017-05-23T09:24:46.705Z'
        },
        {
          id: 2,
          title: 'regular',
          read: null,
          write: null,
          delete: null,
          createdAt: '2017-05-23T09:24:46.705Z',
          updatedAt: '2017-05-23T09:24:46.705Z'
        },
        {
          id: 3,
          title: 'Author',
          read: false,
          write: false,
          delete: false,
          createdAt: '2017-05-29T15:56:39.202Z',
          updatedAt: '2017-05-29T15:56:39.202Z'
        },
        {
          id: 4,
          title: 'Printer',
          read: false,
          write: false,
          delete: false,
          createdAt: '2017-05-29T15:59:11.109Z',
          updatedAt: '2017-05-29T15:59:11.109Z'
        }
      ],
      type: 'SEARCH_USERS',
      users: {
        users: {
          rows: [
            {
              id: 3,
              username: 'gaye',
              fullNames: 'gaye',
              email: 'gaye@gmail.com',
              roleId: 3,
              password: '$2a$10$rrfP24A.JInpljqaj.y7DO2/YbCf3.LQ0XU0QVWyieOM0EpRYcUoy',
              createdAt: '2017-05-28T21:26:12.290Z',
              updatedAt: '2017-06-06T12:13:35.760Z'
            },
            {
              id: 2,
              username: 'Kenny',
              fullNames: 'Bakare Kehinde',
              email: 'noxyblaze@gmail.com',
              roleId: 3,
              password: '$2a$08$VlWprHmJC9K7wNgVuPkQmO/Yxw7akPdpu/psaiJq5J/p5otQ3rL/O',
              createdAt: '2017-05-23T09:24:46.840Z',
              updatedAt: '2017-06-01T11:10:44.235Z'
            },
            {
              id: 24,
              username: 'dido',
              fullNames: 'ajoke anif',
              email: 'dido@gmail.com',
              roleId: 2,
              password: '$2a$10$ceqwCdc7KsCbJenQNPEWiOlxA/gf0Gj4XuGBZHFQsb/nKHXRK5zVa',
              createdAt: '2017-05-31T20:17:32.141Z',
              updatedAt: '2017-05-31T20:17:32.141Z'
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
            {
              id: 27,
              username: 'lola',
              fullNames: 'lola rae',
              email: 'lolarae@gmail.com',
              roleId: 2,
              password: '$2a$10$/RIaZMFayCZeEZOb/Bc/auyZoblR35LZgKFfBvc9Ki0XRNCRpFKJ6',
              createdAt: '2017-05-31T20:31:49.713Z',
              updatedAt: '2017-05-31T20:31:49.713Z'
            },
            {
              id: 12,
              username: 'ajoke',
              fullNames: 'ajoke anike',
              email: 'ajoke@gmail.com',
              roleId: 4,
              password: '$2a$10$0n5mkKuizSI0DiLt2BuxE.v8B2FGRKn90BdOc/L3I/hsplBimxWvS',
              createdAt: '2017-05-31T20:08:00.805Z',
              updatedAt: '2017-06-06T12:25:31.761Z'
            },
          ]
        },
        user: {
          id: 12,
          username: 'ajoke',
          fullNames: 'ajoke anike',
          email: 'ajoke@gmail.com',
          roleId: 4,
          password: '$2a$10$0n5mkKuizSI0DiLt2BuxE.v8B2FGRKn90BdOc/L3I/hsplBimxWvS',
          createdAt: '2017-05-31T20:08:00.805Z',
          updatedAt: '2017-06-06T12:25:31.761Z'
        },
        pagination: {
          page_count: 4,
          page: 1,
          page_size: 6,
          total_count: 23
        }
      }
    });
  });

  it('should handle GET_ROLES actions', () => {
    const state = reducers({
      documents: {
        documents: [],
        pagination: {}
      },
      login: {
        isAunthenticated: true,
        user: {
          userId: 1,
          roleId: 1,
          iat: 1496750518,
          exp: 1497355318
        }
      },
      roles: [
        {
          id: 1,
          title: 'admin',
          read: null,
          write: null,
          delete: null,
          createdAt: '2017-05-23T09:24:46.705Z',
          updatedAt: '2017-05-23T09:24:46.705Z'
        },
        {
          id: 2,
          title: 'regular',
          read: null,
          write: null,
          delete: null,
          createdAt: '2017-05-23T09:24:46.705Z',
          updatedAt: '2017-05-23T09:24:46.705Z'
        },
        {
          id: 3,
          title: 'Author',
          read: false,
          write: false,
          delete: false,
          createdAt: '2017-05-29T15:56:39.202Z',
          updatedAt: '2017-05-29T15:56:39.202Z'
        },
        {
          id: 4,
          title: 'Printer',
          read: false,
          write: false,
          delete: false,
          createdAt: '2017-05-29T15:59:11.109Z',
          updatedAt: '2017-05-29T15:59:11.109Z'
        }
      ],
      users: {
        users: {
          rows: [
            {
              id: 3,
              username: 'gaye',
              fullNames: 'gaye',
              email: 'gaye@gmail.com',
              roleId: 3,
              password: '$2a$10$rrfP24A.JInpljqaj.y7DO2/YbCf3.LQ0XU0QVWyieOM0EpRYcUoy',
              createdAt: '2017-05-28T21:26:12.290Z',
              updatedAt: '2017-06-06T12:13:35.760Z'
            },
            {
              id: 2,
              username: 'Kenny',
              fullNames: 'Bakare Kehinde',
              email: 'noxyblaze@gmail.com',
              roleId: 3,
              password: '$2a$08$VlWprHmJC9K7wNgVuPkQmO/Yxw7akPdpu/psaiJq5J/p5otQ3rL/O',
              createdAt: '2017-05-23T09:24:46.840Z',
              updatedAt: '2017-06-01T11:10:44.235Z'
            },
            {
              id: 24,
              username: 'dido',
              fullNames: 'ajoke anif',
              email: 'dido@gmail.com',
              roleId: 2,
              password: '$2a$10$ceqwCdc7KsCbJenQNPEWiOlxA/gf0Gj4XuGBZHFQsb/nKHXRK5zVa',
              createdAt: '2017-05-31T20:17:32.141Z',
              updatedAt: '2017-05-31T20:17:32.141Z'
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
            {
              id: 27,
              username: 'lola',
              fullNames: 'lola rae',
              email: 'lolarae@gmail.com',
              roleId: 2,
              password: '$2a$10$/RIaZMFayCZeEZOb/Bc/auyZoblR35LZgKFfBvc9Ki0XRNCRpFKJ6',
              createdAt: '2017-05-31T20:31:49.713Z',
              updatedAt: '2017-05-31T20:31:49.713Z'
            },
            {
              id: 12,
              username: 'ajoke',
              fullNames: 'ajoke anike',
              email: 'ajoke@gmail.com',
              roleId: 4,
              password: '$2a$10$0n5mkKuizSI0DiLt2BuxE.v8B2FGRKn90BdOc/L3I/hsplBimxWvS',
              createdAt: '2017-05-31T20:08:00.805Z',
              updatedAt: '2017-06-06T12:25:31.761Z'
            },
          ]
        },
        user: {
          id: 12,
          username: 'ajoke',
          fullNames: 'ajoke anike',
          email: 'ajoke@gmail.com',
          roleId: 4,
          password: '$2a$10$0n5mkKuizSI0DiLt2BuxE.v8B2FGRKn90BdOc/L3I/hsplBimxWvS',
          createdAt: '2017-05-31T20:08:00.805Z',
          updatedAt: '2017-06-06T12:25:31.761Z'
        },
        pagination: {
          page_count: 4,
          page: 1,
          page_size: 6,
          total_count: 23
        }
      },
      type: 'GET_ROLES',
      payload: [
        {
          id: 1,
          title: 'admin',
          read: null,
          write: null,
          delete: null,
          createdAt: '2017-05-23T09:24:46.705Z',
          updatedAt: '2017-05-23T09:24:46.705Z'
        },
        {
          id: 2,
          title: 'regular',
          read: null,
          write: null,
          delete: null,
          createdAt: '2017-05-23T09:24:46.705Z',
          updatedAt: '2017-05-23T09:24:46.705Z'
        },
        {
          id: 3,
          title: 'Author',
          read: false,
          write: false,
          delete: false,
          createdAt: '2017-05-29T15:56:39.202Z',
          updatedAt: '2017-05-29T15:56:39.202Z'
        },
        {
          id: 4,
          title: 'Printer',
          read: false,
          write: false,
          delete: false,
          createdAt: '2017-05-29T15:59:11.109Z',
          updatedAt: '2017-05-29T15:59:11.109Z'
        }
      ],
    });
    expect(state).toEqual({
      documents: {
        documents: [],
        pagination: {}
      },
      payload: [
        {
          id: 1,
          title: 'admin',
          read: null,
          write: null,
          delete: null,
          createdAt: '2017-05-23T09:24:46.705Z',
          updatedAt: '2017-05-23T09:24:46.705Z'
        },
        {
          id: 2,
          title: 'regular',
          read: null,
          write: null,
          delete: null,
          createdAt: '2017-05-23T09:24:46.705Z',
          updatedAt: '2017-05-23T09:24:46.705Z'
        },
        {
          id: 3,
          title: 'Author',
          read: false,
          write: false,
          delete: false,
          createdAt: '2017-05-29T15:56:39.202Z',
          updatedAt: '2017-05-29T15:56:39.202Z'
        },
        {
          id: 4,
          title: 'Printer',
          read: false,
          write: false,
          delete: false,
          createdAt: '2017-05-29T15:59:11.109Z',
          updatedAt: '2017-05-29T15:59:11.109Z'
        }
      ],
      login: {
        isAunthenticated: true,
        user: {
          userId: 1,
          roleId: 1,
          iat: 1496750518,
          exp: 1497355318
        } },
      roles: [
        {
          id: 1,
          title: 'admin',
          read: null,
          write: null,
          delete: null,
          createdAt: '2017-05-23T09:24:46.705Z',
          updatedAt: '2017-05-23T09:24:46.705Z'
        },
        {
          id: 2,
          title: 'regular',
          read: null,
          write: null,
          delete: null,
          createdAt: '2017-05-23T09:24:46.705Z',
          updatedAt: '2017-05-23T09:24:46.705Z'
        },
        {
          id: 3,
          title: 'Author',
          read: false,
          write: false,
          delete: false,
          createdAt: '2017-05-29T15:56:39.202Z',
          updatedAt: '2017-05-29T15:56:39.202Z'
        },
        {
          id: 4,
          title: 'Printer',
          read: false,
          write: false,
          delete: false,
          createdAt: '2017-05-29T15:59:11.109Z',
          updatedAt: '2017-05-29T15:59:11.109Z'
        }
      ],
      type: 'GET_ROLES',
      users: {
        users: {
          rows: [
            {
              id: 3,
              username: 'gaye',
              fullNames: 'gaye',
              email: 'gaye@gmail.com',
              roleId: 3,
              password: '$2a$10$rrfP24A.JInpljqaj.y7DO2/YbCf3.LQ0XU0QVWyieOM0EpRYcUoy',
              createdAt: '2017-05-28T21:26:12.290Z',
              updatedAt: '2017-06-06T12:13:35.760Z'
            },
            {
              id: 2,
              username: 'Kenny',
              fullNames: 'Bakare Kehinde',
              email: 'noxyblaze@gmail.com',
              roleId: 3,
              password: '$2a$08$VlWprHmJC9K7wNgVuPkQmO/Yxw7akPdpu/psaiJq5J/p5otQ3rL/O',
              createdAt: '2017-05-23T09:24:46.840Z',
              updatedAt: '2017-06-01T11:10:44.235Z'
            },
            {
              id: 24,
              username: 'dido',
              fullNames: 'ajoke anif',
              email: 'dido@gmail.com',
              roleId: 2,
              password: '$2a$10$ceqwCdc7KsCbJenQNPEWiOlxA/gf0Gj4XuGBZHFQsb/nKHXRK5zVa',
              createdAt: '2017-05-31T20:17:32.141Z',
              updatedAt: '2017-05-31T20:17:32.141Z'
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
            {
              id: 27,
              username: 'lola',
              fullNames: 'lola rae',
              email: 'lolarae@gmail.com',
              roleId: 2,
              password: '$2a$10$/RIaZMFayCZeEZOb/Bc/auyZoblR35LZgKFfBvc9Ki0XRNCRpFKJ6',
              createdAt: '2017-05-31T20:31:49.713Z',
              updatedAt: '2017-05-31T20:31:49.713Z'
            },
            {
              id: 12,
              username: 'ajoke',
              fullNames: 'ajoke anike',
              email: 'ajoke@gmail.com',
              roleId: 4,
              password: '$2a$10$0n5mkKuizSI0DiLt2BuxE.v8B2FGRKn90BdOc/L3I/hsplBimxWvS',
              createdAt: '2017-05-31T20:08:00.805Z',
              updatedAt: '2017-06-06T12:25:31.761Z'
            },
          ]
        },
        user: {
          id: 12,
          username: 'ajoke',
          fullNames: 'ajoke anike',
          email: 'ajoke@gmail.com',
          roleId: 4,
          password: '$2a$10$0n5mkKuizSI0DiLt2BuxE.v8B2FGRKn90BdOc/L3I/hsplBimxWvS',
          createdAt: '2017-05-31T20:08:00.805Z',
          updatedAt: '2017-06-06T12:25:31.761Z'
        },
        pagination: {
          page_count: 4,
          page: 1,
          page_size: 6,
          total_count: 23
        }
      }
    });
  });
  it('should handle SEARCH_USERS actions', () => {
    const state = reducers({
      documents: {
        documents: [],
        pagination: {}
      },
      login: {
        isAunthenticated: true,
        user: {
          userId: 1,
          roleId: 1,
          iat: 1496750518,
          exp: 1497355318
        }
      },
      roles: [
        {
          id: 1,
          title: 'admin',
          read: null,
          write: null,
          delete: null,
          createdAt: '2017-05-23T09:24:46.705Z',
          updatedAt: '2017-05-23T09:24:46.705Z'
        },
        {
          id: 2,
          title: 'regular',
          read: null,
          write: null,
          delete: null,
          createdAt: '2017-05-23T09:24:46.705Z',
          updatedAt: '2017-05-23T09:24:46.705Z'
        },
        {
          id: 3,
          title: 'Author',
          read: false,
          write: false,
          delete: false,
          createdAt: '2017-05-29T15:56:39.202Z',
          updatedAt: '2017-05-29T15:56:39.202Z'
        },
        {
          id: 4,
          title: 'Printer',
          read: false,
          write: false,
          delete: false,
          createdAt: '2017-05-29T15:59:11.109Z',
          updatedAt: '2017-05-29T15:59:11.109Z'
        }
      ],
      users: {
        users: {
          rows: [
            {
              id: 3,
              username: 'gaye',
              fullNames: 'gaye',
              email: 'gaye@gmail.com',
              roleId: 3,
              password: '$2a$10$rrfP24A.JInpljqaj.y7DO2/YbCf3.LQ0XU0QVWyieOM0EpRYcUoy',
              createdAt: '2017-05-28T21:26:12.290Z',
              updatedAt: '2017-06-06T12:13:35.760Z'
            },
            {
              id: 2,
              username: 'Kenny',
              fullNames: 'Bakare Kehinde',
              email: 'noxyblaze@gmail.com',
              roleId: 3,
              password: '$2a$08$VlWprHmJC9K7wNgVuPkQmO/Yxw7akPdpu/psaiJq5J/p5otQ3rL/O',
              createdAt: '2017-05-23T09:24:46.840Z',
              updatedAt: '2017-06-01T11:10:44.235Z'
            },
            {
              id: 24,
              username: 'dido',
              fullNames: 'ajoke anif',
              email: 'dido@gmail.com',
              roleId: 2,
              password: '$2a$10$ceqwCdc7KsCbJenQNPEWiOlxA/gf0Gj4XuGBZHFQsb/nKHXRK5zVa',
              createdAt: '2017-05-31T20:17:32.141Z',
              updatedAt: '2017-05-31T20:17:32.141Z'
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
            {
              id: 27,
              username: 'lola',
              fullNames: 'lola rae',
              email: 'lolarae@gmail.com',
              roleId: 2,
              password: '$2a$10$/RIaZMFayCZeEZOb/Bc/auyZoblR35LZgKFfBvc9Ki0XRNCRpFKJ6',
              createdAt: '2017-05-31T20:31:49.713Z',
              updatedAt: '2017-05-31T20:31:49.713Z'
            },
            {
              id: 12,
              username: 'ajoke',
              fullNames: 'ajoke anike',
              email: 'ajoke@gmail.com',
              roleId: 4,
              password: '$2a$10$0n5mkKuizSI0DiLt2BuxE.v8B2FGRKn90BdOc/L3I/hsplBimxWvS',
              createdAt: '2017-05-31T20:08:00.805Z',
              updatedAt: '2017-06-06T12:25:31.761Z'
            },
          ]
        },
        user: {
          id: 12,
          username: 'ajoke',
          fullNames: 'ajoke anike',
          email: 'ajoke@gmail.com',
          roleId: 4,
          password: '$2a$10$0n5mkKuizSI0DiLt2BuxE.v8B2FGRKn90BdOc/L3I/hsplBimxWvS',
          createdAt: '2017-05-31T20:08:00.805Z',
          updatedAt: '2017-06-06T12:25:31.761Z'
        },
        pagination: {
          page_count: 4,
          page: 1,
          page_size: 6,
          total_count: 23
        }
      },
      type: 'SEARCH_USERS',
      payload: {
        message: 'Your search was successful',
        users: {
          count: 1,
          rows: [
            {
              id: 3,
              username: 'gaye',
              fullNames: 'gaye',
              email: 'gaye@gmail.com',
              roleId: 3,
              password: '$2a$10$rrfP24A.JInpljqaj.y7DO2/YbCf3.LQ0XU0QVWyieOM0EpRYcUoy',
              createdAt: '2017-05-28T21:26:12.290Z',
              updatedAt: '2017-06-06T12:13:35.760Z'
            }
          ],
          pagination: {
            page_count: 1,
            page: 1,
            page_size: 1,
            total_count: 1
          }
        }
      }
    });
    expect(state).toEqual({
      documents: {
        documents: [],
        pagination: {}
      },
      payload: {
        message: 'Your search was successful',
        users: {
          count: 1,
          rows: [
            {
              id: 3,
              username: 'gaye',
              fullNames: 'gaye',
              email: 'gaye@gmail.com',
              roleId: 3,
              password: '$2a$10$rrfP24A.JInpljqaj.y7DO2/YbCf3.LQ0XU0QVWyieOM0EpRYcUoy',
              createdAt: '2017-05-28T21:26:12.290Z',
              updatedAt: '2017-06-06T12:13:35.760Z'
            }
          ],
          pagination: {
            page_count: 1,
            page: 1,
            page_size: 1,
            total_count: 1
          }
        }
      },
      login: {
        isAunthenticated: true,
        user: {
          userId: 1,
          roleId: 1,
          iat: 1496750518,
          exp: 1497355318
        } },
      roles: [
        {
          id: 1,
          title: 'admin',
          read: null,
          write: null,
          delete: null,
          createdAt: '2017-05-23T09:24:46.705Z',
          updatedAt: '2017-05-23T09:24:46.705Z'
        },
        {
          id: 2,
          title: 'regular',
          read: null,
          write: null,
          delete: null,
          createdAt: '2017-05-23T09:24:46.705Z',
          updatedAt: '2017-05-23T09:24:46.705Z'
        },
        {
          id: 3,
          title: 'Author',
          read: false,
          write: false,
          delete: false,
          createdAt: '2017-05-29T15:56:39.202Z',
          updatedAt: '2017-05-29T15:56:39.202Z'
        },
        {
          id: 4,
          title: 'Printer',
          read: false,
          write: false,
          delete: false,
          createdAt: '2017-05-29T15:59:11.109Z',
          updatedAt: '2017-05-29T15:59:11.109Z'
        }
      ],
      type: 'SEARCH_USERS',
      users: {
        users: {
          rows: [
            {
              id: 3,
              username: 'gaye',
              fullNames: 'gaye',
              email: 'gaye@gmail.com',
              roleId: 3,
              password: '$2a$10$rrfP24A.JInpljqaj.y7DO2/YbCf3.LQ0XU0QVWyieOM0EpRYcUoy',
              createdAt: '2017-05-28T21:26:12.290Z',
              updatedAt: '2017-06-06T12:13:35.760Z'
            },
            {
              id: 2,
              username: 'Kenny',
              fullNames: 'Bakare Kehinde',
              email: 'noxyblaze@gmail.com',
              roleId: 3,
              password: '$2a$08$VlWprHmJC9K7wNgVuPkQmO/Yxw7akPdpu/psaiJq5J/p5otQ3rL/O',
              createdAt: '2017-05-23T09:24:46.840Z',
              updatedAt: '2017-06-01T11:10:44.235Z'
            },
            {
              id: 24,
              username: 'dido',
              fullNames: 'ajoke anif',
              email: 'dido@gmail.com',
              roleId: 2,
              password: '$2a$10$ceqwCdc7KsCbJenQNPEWiOlxA/gf0Gj4XuGBZHFQsb/nKHXRK5zVa',
              createdAt: '2017-05-31T20:17:32.141Z',
              updatedAt: '2017-05-31T20:17:32.141Z'
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
            {
              id: 27,
              username: 'lola',
              fullNames: 'lola rae',
              email: 'lolarae@gmail.com',
              roleId: 2,
              password: '$2a$10$/RIaZMFayCZeEZOb/Bc/auyZoblR35LZgKFfBvc9Ki0XRNCRpFKJ6',
              createdAt: '2017-05-31T20:31:49.713Z',
              updatedAt: '2017-05-31T20:31:49.713Z'
            },
            {
              id: 12,
              username: 'ajoke',
              fullNames: 'ajoke anike',
              email: 'ajoke@gmail.com',
              roleId: 4,
              password: '$2a$10$0n5mkKuizSI0DiLt2BuxE.v8B2FGRKn90BdOc/L3I/hsplBimxWvS',
              createdAt: '2017-05-31T20:08:00.805Z',
              updatedAt: '2017-06-06T12:25:31.761Z'
            },
          ]
        },
        user: {
          id: 12,
          username: 'ajoke',
          fullNames: 'ajoke anike',
          email: 'ajoke@gmail.com',
          roleId: 4,
          password: '$2a$10$0n5mkKuizSI0DiLt2BuxE.v8B2FGRKn90BdOc/L3I/hsplBimxWvS',
          createdAt: '2017-05-31T20:08:00.805Z',
          updatedAt: '2017-06-06T12:25:31.761Z'
        },
        pagination: {
          page_count: 4,
          page: 1,
          page_size: 6,
          total_count: 23
        }
      }
    });
  });


  it('should handle SET_CURRENT_USER actions', () => {
    const state = reducers({
      documents: {
        documents: [],
        pagination: {}
      },
      login: {
        isAunthenticated: true,
        user: {
          userId: 1,
          roleId: 1,
          iat: 1496750518,
          exp: 1497355318
        }
      },
      roles: [
        {
          id: 1,
          title: 'admin',
          read: null,
          write: null,
          delete: null,
          createdAt: '2017-05-23T09:24:46.705Z',
          updatedAt: '2017-05-23T09:24:46.705Z'
        },
        {
          id: 2,
          title: 'regular',
          read: null,
          write: null,
          delete: null,
          createdAt: '2017-05-23T09:24:46.705Z',
          updatedAt: '2017-05-23T09:24:46.705Z'
        },
        {
          id: 3,
          title: 'Author',
          read: false,
          write: false,
          delete: false,
          createdAt: '2017-05-29T15:56:39.202Z',
          updatedAt: '2017-05-29T15:56:39.202Z'
        },
        {
          id: 4,
          title: 'Printer',
          read: false,
          write: false,
          delete: false,
          createdAt: '2017-05-29T15:59:11.109Z',
          updatedAt: '2017-05-29T15:59:11.109Z'
        }
      ],
      users: {
        users: {
          rows: [
            {
              id: 3,
              username: 'gaye',
              fullNames: 'gaye',
              email: 'gaye@gmail.com',
              roleId: 3,
              password: '$2a$10$rrfP24A.JInpljqaj.y7DO2/YbCf3.LQ0XU0QVWyieOM0EpRYcUoy',
              createdAt: '2017-05-28T21:26:12.290Z',
              updatedAt: '2017-06-06T12:13:35.760Z'
            },
            {
              id: 2,
              username: 'Kenny',
              fullNames: 'Bakare Kehinde',
              email: 'noxyblaze@gmail.com',
              roleId: 3,
              password: '$2a$08$VlWprHmJC9K7wNgVuPkQmO/Yxw7akPdpu/psaiJq5J/p5otQ3rL/O',
              createdAt: '2017-05-23T09:24:46.840Z',
              updatedAt: '2017-06-01T11:10:44.235Z'
            },
            {
              id: 24,
              username: 'dido',
              fullNames: 'ajoke anif',
              email: 'dido@gmail.com',
              roleId: 2,
              password: '$2a$10$ceqwCdc7KsCbJenQNPEWiOlxA/gf0Gj4XuGBZHFQsb/nKHXRK5zVa',
              createdAt: '2017-05-31T20:17:32.141Z',
              updatedAt: '2017-05-31T20:17:32.141Z'
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
            {
              id: 27,
              username: 'lola',
              fullNames: 'lola rae',
              email: 'lolarae@gmail.com',
              roleId: 2,
              password: '$2a$10$/RIaZMFayCZeEZOb/Bc/auyZoblR35LZgKFfBvc9Ki0XRNCRpFKJ6',
              createdAt: '2017-05-31T20:31:49.713Z',
              updatedAt: '2017-05-31T20:31:49.713Z'
            },
            {
              id: 12,
              username: 'ajoke',
              fullNames: 'ajoke anike',
              email: 'ajoke@gmail.com',
              roleId: 4,
              password: '$2a$10$0n5mkKuizSI0DiLt2BuxE.v8B2FGRKn90BdOc/L3I/hsplBimxWvS',
              createdAt: '2017-05-31T20:08:00.805Z',
              updatedAt: '2017-06-06T12:25:31.761Z'
            },
          ]
        },
        user: {
          id: 12,
          username: 'ajoke',
          fullNames: 'ajoke anike',
          email: 'ajoke@gmail.com',
          roleId: 4,
          password: '$2a$10$0n5mkKuizSI0DiLt2BuxE.v8B2FGRKn90BdOc/L3I/hsplBimxWvS',
          createdAt: '2017-05-31T20:08:00.805Z',
          updatedAt: '2017-06-06T12:25:31.761Z'
        },
        pagination: {
          page_count: 4,
          page: 1,
          page_size: 6,
          total_count: 23
        }
      },
      type: 'SET_CURRENT_USER',
      user: {
        userId: 1,
        roleId: 1,
        iat: 1496750518,
        exp: 1497355318
      }
    });
    expect(state).toEqual({
      documents: {
        documents: [],
        pagination: {}
      },
      user: {
        userId: 1,
        roleId: 1,
        iat: 1496750518,
        exp: 1497355318
      },
      login: {
        isAunthenticated: true,
        user: {
          userId: 1,
          roleId: 1,
          iat: 1496750518,
          exp: 1497355318
        } },
      roles: [
        {
          id: 1,
          title: 'admin',
          read: null,
          write: null,
          delete: null,
          createdAt: '2017-05-23T09:24:46.705Z',
          updatedAt: '2017-05-23T09:24:46.705Z'
        },
        {
          id: 2,
          title: 'regular',
          read: null,
          write: null,
          delete: null,
          createdAt: '2017-05-23T09:24:46.705Z',
          updatedAt: '2017-05-23T09:24:46.705Z'
        },
        {
          id: 3,
          title: 'Author',
          read: false,
          write: false,
          delete: false,
          createdAt: '2017-05-29T15:56:39.202Z',
          updatedAt: '2017-05-29T15:56:39.202Z'
        },
        {
          id: 4,
          title: 'Printer',
          read: false,
          write: false,
          delete: false,
          createdAt: '2017-05-29T15:59:11.109Z',
          updatedAt: '2017-05-29T15:59:11.109Z'
        }
      ],
      type: 'SET_CURRENT_USER',
      users: {
        users: {
          rows: [
            {
              id: 3,
              username: 'gaye',
              fullNames: 'gaye',
              email: 'gaye@gmail.com',
              roleId: 3,
              password: '$2a$10$rrfP24A.JInpljqaj.y7DO2/YbCf3.LQ0XU0QVWyieOM0EpRYcUoy',
              createdAt: '2017-05-28T21:26:12.290Z',
              updatedAt: '2017-06-06T12:13:35.760Z'
            },
            {
              id: 2,
              username: 'Kenny',
              fullNames: 'Bakare Kehinde',
              email: 'noxyblaze@gmail.com',
              roleId: 3,
              password: '$2a$08$VlWprHmJC9K7wNgVuPkQmO/Yxw7akPdpu/psaiJq5J/p5otQ3rL/O',
              createdAt: '2017-05-23T09:24:46.840Z',
              updatedAt: '2017-06-01T11:10:44.235Z'
            },
            {
              id: 24,
              username: 'dido',
              fullNames: 'ajoke anif',
              email: 'dido@gmail.com',
              roleId: 2,
              password: '$2a$10$ceqwCdc7KsCbJenQNPEWiOlxA/gf0Gj4XuGBZHFQsb/nKHXRK5zVa',
              createdAt: '2017-05-31T20:17:32.141Z',
              updatedAt: '2017-05-31T20:17:32.141Z'
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
            {
              id: 27,
              username: 'lola',
              fullNames: 'lola rae',
              email: 'lolarae@gmail.com',
              roleId: 2,
              password: '$2a$10$/RIaZMFayCZeEZOb/Bc/auyZoblR35LZgKFfBvc9Ki0XRNCRpFKJ6',
              createdAt: '2017-05-31T20:31:49.713Z',
              updatedAt: '2017-05-31T20:31:49.713Z'
            },
            {
              id: 12,
              username: 'ajoke',
              fullNames: 'ajoke anike',
              email: 'ajoke@gmail.com',
              roleId: 4,
              password: '$2a$10$0n5mkKuizSI0DiLt2BuxE.v8B2FGRKn90BdOc/L3I/hsplBimxWvS',
              createdAt: '2017-05-31T20:08:00.805Z',
              updatedAt: '2017-06-06T12:25:31.761Z'
            },
          ]
        },
        user: {
          id: 12,
          username: 'ajoke',
          fullNames: 'ajoke anike',
          email: 'ajoke@gmail.com',
          roleId: 4,
          password: '$2a$10$0n5mkKuizSI0DiLt2BuxE.v8B2FGRKn90BdOc/L3I/hsplBimxWvS',
          createdAt: '2017-05-31T20:08:00.805Z',
          updatedAt: '2017-06-06T12:25:31.761Z'
        },
        pagination: {
          page_count: 4,
          page: 1,
          page_size: 6,
          total_count: 23
        }
      }
    });
  });
});
