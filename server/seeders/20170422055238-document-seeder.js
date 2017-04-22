const faker = require('faker');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Documents', [
    {
      title: 'I love nano technology',
      content: `Cumque dolorum laborum sint id. Error cumque ipsa
      culpa est delectus dolores consequatur et laudantium.
      Est enim facilis ad occaecati iusto qui. Et rerum tempora eius et
      quae eveniet. Ut adipisci ut occaecati id assumenda nihil.
      Eos repudiandae est sed qui est sapiente temporibus dolorem.`,
      access: 'public',
      ownerRoleId: 1,
      ownerId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'private',
      ownerRoleId: 2,
      ownerId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'public',
      ownerRoleId: 3,
      ownerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'private',
      ownerRoleId: 4,
      ownerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'public',
      ownerRoleId: 5,
      ownerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'private',
      ownerRoleId: 2,
      ownerId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'public',
      ownerRoleId: 3,
      ownerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'private',
      ownerRoleId: 4,
      ownerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'public',
      ownerRoleId: 5,
      ownerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'private',
      ownerRoleId: 2,
      ownerId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'public',
      ownerRoleId: 3,
      ownerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'private',
      ownerRoleId: 4,
      ownerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'public',
      ownerRoleId: 5,
      ownerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'private',
      ownerRoleId: 2,
      ownerId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'public',
      ownerRoleId: 3,
      ownerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'private',
      ownerRoleId: 4,
      ownerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'private',
      ownerRoleId: 2,
      ownerId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'public',
      ownerRoleId: 3,
      ownerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'private',
      ownerRoleId: 4,
      ownerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'public',
      ownerRoleId: 5,
      ownerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'private',
      ownerRoleId: 2,
      ownerId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'public',
      ownerRoleId: 3,
      ownerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'private',
      ownerRoleId: 4,
      ownerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'public',
      ownerRoleId: 5,
      ownerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'private',
      ownerRoleId: 2,
      ownerId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'public',
      ownerRoleId: 3,
      ownerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'public',
      ownerRoleId: 4,
      ownerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'public',
      ownerRoleId: 5,
      ownerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'private',
      ownerRoleId: 2,
      ownerId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'public',
      ownerRoleId: 3,
      ownerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'private',
      ownerRoleId: 4,
      ownerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'public',
      ownerRoleId: 5,
      ownerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {}),
  down: queryInterface => queryInterface.bulkDelete('Person',
  null, {})
};
