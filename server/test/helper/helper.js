import faker from 'faker';

const fakeHelper = {
  adminRole: {
    id: 1,
    title: 'admin'
  },
  regularRole: {
    id: 2,
    title: 'regular'
  },
  guestRole: {
    id: 3,
    title: 'guestI'
  },
  guestRole2: {
    id: 4,
    title: 'guestII'
  },
  guestRole3: {
    id: 5,
    title: 'guestIII'
  },
  guestRole4: {
    id: 6,
    title: 'guestIV'
  },
  adminUser: {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    fullNames: `${faker.name.firstName()} ${faker.name.lastName}`
  },
  adminUserII: {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    fullNames: `${faker.name.firstName()} ${faker.name.lastName}`
  },
  regularUserI: {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    fullNames: `${faker.name.firstName()} ${faker.name.lastName}`
  },
  regularUserII: {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    fullNames: `${faker.name.firstName()} ${faker.name.lastName}`
  },
  regularUserIII: {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    fullNames: `${faker.name.firstName()} ${faker.name.lastName}`
  },
  guestUserI: {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    fullNames: `${faker.name.firstName()} ${faker.name.lastName}`
  },
  guestUserII: {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    fullNames: `${faker.name.firstName()} ${faker.name.lastName}`
  },
  guestUserIII: {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    fullNames: `${faker.name.firstName()} ${faker.name.lastName}`
  },
  usersArray() {
    const users = [];
    let i = 0;
    for (i; i <= 15; i += 1) {
      users.push({
        username: faker.internet.userName(),
        password: faker.internet.password(),
        email: faker.internet.email(),
        fullNames: `${faker.name.firstName()} ${faker.name.lastName}`
      });
    }
    return users;
  },
  invalidEmailUser: {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    email: 'email',
    fullNames: `${faker.name.firstName()} ${faker.name.lastName}`
  },
  invalidPasswordUser: {
    username: faker.internet.userName(),
    password: 'password',
    email: faker.internet.email(),
    fullNames: `${faker.name.firstName()} ${faker.name.lastName}`
  },
  invalidUser: {
    username: null,
    password: null,
    email: null,
    fullNames: null
  },
  publicDocument: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 'public'
  },
  privateDocument: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 'private'
  },
  testDocument: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph()
  }
};
export default fakeHelper;
