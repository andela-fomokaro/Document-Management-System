module.exports = {
  up: queryInterface =>
   queryInterface.bulkInsert('Roles', [{
     title: 'admin',
     createdAt: new Date(),
     updatedAt: new Date(),
   },
   {
     title: 'regular',
     createdAt: new Date(),
     updatedAt: new Date(),
   },
   ], { returning: true }),
  down: queryInterface =>
   queryInterface.bulkDelete('Person', null, {}),
};
