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
      ownerId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'private',
      ownerId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'public',
      ownerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'private',
      ownerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'public',
      ownerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'private',
      ownerId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'public',
      ownerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'private',
      ownerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'public',
      ownerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'private',
      ownerId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'public',
      ownerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'private',
      ownerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'public',
      ownerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'private',
      ownerId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'public',
      ownerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'private',
      ownerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'private',
      ownerId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'public',
      ownerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'private',
      ownerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'public',
      ownerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'private',
      ownerId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'public',
      ownerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'private',
      ownerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'public',
      ownerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'private',
      ownerId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'public',
      ownerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'public',
      ownerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'public',
      ownerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'private',
      ownerId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'public',
      ownerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'private',
      ownerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(),
      access: 'public',
      ownerId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], { returning: true }),
  down: queryInterface => queryInterface.bulkDelete('Person',
  null, {})
};
