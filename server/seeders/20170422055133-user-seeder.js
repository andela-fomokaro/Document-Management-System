const bcrypt = require('bcrypt-nodejs');

module.exports = {
  up: queryInterface =>
   queryInterface.bulkInsert('Users', [
     {
       userName: 'faith',
       firstName: 'Omokaro',
       lastName: 'faith',
       email: 'omokarofaith@gmail.com',
       password: bcrypt.hashSync('omokarofaith@gmail.com', bcrypt.genSaltSync(8)),
       roleId: '1',
       active: false,
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       userName: 'noxyblaze',
       firstName: 'Bakare',
       lastName: 'Kehinde',
       email: 'noxyblaze@gmail.com',
       password: bcrypt.hashSync('noxyblaze@gmail.com', bcrypt.genSaltSync(8)),
       roleId: '1',
       active: false,
       createdAt: new Date(),
       updatedAt: new Date()
     }
   ], {}),
  down: queryInterface =>
   queryInterface.bulkDelete('Person', null, {})
};
