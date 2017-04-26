// import supertest from 'supertest';
// import chai from 'chai';
// import app from '../../../server';
// import db from '../../models';
// import fakeHelper from '../helper/helper';

// const request = supertest.agent(app);
// const expect = chai.expect;

// let regularUserII;
// let regularUserI = fakeHelper.testUser2;



// describe('New Users', () => {
//   describe('Create Users', () => {
//     it('should create a new user', (done) => {
//       request.post('/users')
//             .send(fakeHelper.regularUserII)
//             .end((error, response) => {
//               regularUserII = response.body.Users;
//               console.log(regularUserII);
//               expect(response.status).to.equal(201);
//               expect(response.body.newUser.username)
//                 .to.equal(fakeHelper.regularUserII.username);
//               expect(response.body.newUser.fullNames)
//                 .to.equal(fakeHelper.regularUserII.fullNames);
//               expect(response.body.newUser.password)
//                 .to.not.equal(fakeHelper.regularUserII.password);
//               expect(response.body.newUser.roleId).to.equal(2);
//               done();
//             });
//     });
//   });
// });

// // describe('Role API:', () => {
// //   let adminUserToken;
// //   let regularUserToken;
// //   const role = {};

// //   before((done) => {
// //     request.post('users/login')
// //       .send(adminUser)
// //       .end((error) => {

// //         request.post('users/login')
// //           .send(regularUser)
// //           .end((err, res) => {
// //             regularUserToken = res.body.token;
// //             done();
// //           });
// //       });
// //   });

// //   // Test roles http requests
// //   describe('ROLES REQUESTS:', () => {
// //     // POST requests - Create Roles
// //     describe('POST: (/roles) - CREATE ROLE', () => {
// //       it('should not create a role when required field is invalid', (done) => {
// //         const newRole = {
// //           theTitle: 'regular'
// //         };
// //         request.post('/roles')
// //           .set({
// //             Authorization: adminUserToken
// //           })
// //           .send(newRole)
// //           .end((error, response) => {
// //             expect(response.status).to.equal(400);
// //             done();
// //           });
// //       });
// //     });
// //   });
// // });

