const bcrypt = require('bcrypt-nodejs');
require('dotenv').config();
module.exports = {
  up: queryInterface =>
   queryInterface.bulkInsert('Users', [
     {
       username: process.env.ADMIN_USER_NAME,
       fullNames: process.env.ADMIN_FULL_NAME,
       email: process.env.ADMIN_EMAIL,
       password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, bcrypt.genSaltSync(8)),
       roleId: process.env.ADMIN_ROLE_ID,
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       username: 'noxyblaze',
       fullNames: 'Bakare Kehinde',
       email: 'noxyblaze@gmail.com',
       password: bcrypt.hashSync('noxyblaze@gmail.com', bcrypt.genSaltSync(8)),
       roleId: '2',
       createdAt: new Date(),
       updatedAt: new Date()
     }
   ], { returning: true }),
  down: queryInterface =>
   queryInterface.bulkDelete('Person', null, {})
};
