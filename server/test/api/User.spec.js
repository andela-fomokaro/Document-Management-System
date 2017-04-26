import supertest from 'supertest';
import chai from 'chai';
import app from '../../../server';
import db from '../../models';
import fakeHelper from '../helper/helper';


const request = supertest.agent(app);
const expect = chai.expect;

let adminUser;
let adminToken;
let regularUserI;
const testUser1 = fakeHelper.testUser1;
let regularToken;

const emptyValue = ['username', 'fullNames', 'password', 'email'];
const uniqueField = ['username', 'email'];

describe('User API', () => {
  before((done) => {
    db.Roles.bulkCreate([{ title: 'admin', id: 1 }, { title: 'regular', id: 2 }])
    .then((role) => {
      fakeHelper.adminUser.roleId = role[0].id;
      db.Users.create(fakeHelper.adminUser)
        .then((admin) => {
          adminUser = admin.dataValues;
          done();
        });
    });
  });
  after(() => {
    db.Roles.destroy({ where: {} });
  });

  describe('New Users', () => {
    describe('Create Users', () => {
      it('should create a new user', (done) => {
        request.post('/users')
            .send(fakeHelper.regularUserI)
            .end((error, response) => {
              regularUserI = response.body.Users;
              expect(response.status).to.equal(201);
              expect(response.body.newUser.username)
                .to.equal(fakeHelper.regularUserI.username);
              expect(response.body.newUser.fullNames)
                .to.equal(fakeHelper.regularUserI.fullNames);
              expect(response.body.newUser.password)
                .to.not.equal(fakeHelper.regularUserI.password);
              expect(response.body.newUser.roleId).to.equal(2);
              done();
            });
      });
      uniqueField.forEach((field) => {
        const uniqueUser = Object.assign({}, fakeHelper.regularUserI);
        uniqueUser[field] = fakeHelper.regularUserI[field];
        it(`should fail when already existing ${field} is supplied`, (done) => {
          request.post('/users')
            .send(uniqueUser)
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body.message)
                .to.equal('error');
              done();
            });
        });
      });
      emptyValue.forEach((field) => {
        const invalidUser = fakeHelper.invalidUser;
        it(`should fail when ${field} is null `, (done) => {
          request.post('/users')
            .send(invalidUser)
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body.message).to
                .equal('error');
              done();
            });
        });
      });
    });
    describe('Existing users', () => {
      describe('Login /users/login', () => {
        it('should allow admin user to login', (done) => {
          request.post('/users/login')
          .send(fakeHelper.adminUser)
          .end((err, res) => {
            adminToken = res.body.token;
            expect(res.status).to.equal(200);
            expect(res.body.token).to.not.equal(null);
            expect(res.body.message).to
              .equal('You have successfully logged in');
            done();
          });
        });
        it('should allow other users to login', (done) => {
          request.post('/users/login')
          .send(fakeHelper.regularUserI)
          .end((err, res) => {
            regularToken = res.body.token;
            expect(res.status).to.equal(200);
            expect(res.body.token).to.not.equal(null);
            expect(res.body.message).to
              .equal('You have successfully logged in');
            done();
          });
        });
        it('should not allow unregistered users to login', (done) => {
          request.post('/users/login')
          .send(fakeHelper.regularUserII)
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message).to
              .equal('Please enter a valid email or password to log in');
            done();
          });
        });
        it('should not allow login with invalid password', (done) => {
          request.post('/users/login')
          .send({ email: 'noxy@gmail.com', password: 'invalid' })
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message).to
              .equal('Please enter a valid email or password to log in');
            done();
          });
        });
      });
      describe('Get all users, GET /users ', () => {
        it('should return verification failed if no token is supply', (done) => {
          request.get('/users')
          .set({ })
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message).to
              .equal('Unauthorized Access');
            done();
          });
        });
        it('should return invalid token if token is invalid', (done) => {
          request.get('/users')
          .set({ 'x-access-token': 'hello-andela-tia' })
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message).to
              .equal('Invalid Token');
            done();
          });
        });
        it(`should return users own profile, 
          when the requester is a regular user`, (done) => {
          request.get('/users')
          .set({ 'x-access-token': regularToken })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.message).to
              .equal('You have successfully retrieved all users');
            expect(res.body.users.rows[1].username).to
              .equal(fakeHelper.regularUserI.username);
            done();
          });
        });
      });
      describe('Get user by Id GET /users/:id', () => {
        it('should return verification failed for unregistered user', (done) => {
          request.get(`/users/${adminUser.id}`)
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message).to
              .equal('Unauthorized Access');
            done();
          });
        });
        it('should return user\'s profile when valid user\'s id is supplied',
      (done) => {
        console.log(fakeHelper);
        request.get(`/users/${fakeHelper.regularUserI.id}`)
          .set({ 'x-access-token': regularToken })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.user).to.not.equal(null);
            expect(res.body.id).to.equal(fakeHelper.regularUserI.id);
            expect(res.body.email).to.equal(fakeHelper.regularUserI.email);
            done();
          });
      });
        it('should return not found for invalid user id', (done) => {
          request.get('/users/9999')
          .set({ 'x-access-token': adminToken })
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.message).to.equal('User 9999 cannot be found');
            done();
          });
        });
      });
      describe('Update user attributes PUT /users/:id', () => {
        it('should update user\'s profile when valid user token is supplied',
      (done) => {
        const updateData = {
          fullNames: 'Omokaro Faith',
          username: 'Toby47'
        };
        request.put(`/users/${fakeHelper.regularUserI.id}`)
          .send(updateData)
          .set({ 'x-access-token': regularToken })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.updatedUsers.fullNames).to.equal('Omokaro Faith');
            expect(res.body.updatedUsers.username).to.equal('Toby47');
            done();
          });
      });
        it('should return not found for invalid user id', (done) => {
          const data = { username: 'noxy', lastname: 'blaze' };
          request.put('/users/99999')
          .send(data)
          .set({ 'x-access-token': adminToken })
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.message).to.equal('User Not Found');
            done();
          });
        });
      //   it(`should return permission denied when regular user want to
      //   update another user's profile`, (done) => {
      //   const data = { username: 'wale', lastname: 'ala' };
      //   request.put(`/users/${newAdminUser.id}`)
      //     .send(data)
      //     .set({ 'x-access-token': regularToken })
      //     .end((err, res) => {
      //       expect(res.status).to.equal(401);
      //       expect(res.body.message).to
      //         .equal('You are not permitted to update this profile');
      //       done();
      //     });
      // });
      // it('should give admin permission to update any user\'s profile',
      // (done) => {
      //   const data = { username: 'wale', lastname: 'ala' };
      //   request.put(`/users/${adminUser.id}`)
      //     .send(data)
      //     .set({ 'x-access-token': adminToken })
      //     .end((err, res) => {
      //       expect(res.status).to.equal(200);
      //       expect(res.body.message).to
      //         .equal('Your profile has been updated');
      //       expect(res.body.updatedUser.username).to.equal('wale');
      //       expect(res.body.updatedUser.lastname).to.equal('ala');
      //       done();
      //     });
      // });
      });
      describe('Delete user DELETE /users/:id', () => {
        let newUser, newUSerToken;
        before((done) => {
          request.post('/users')
          .send(fakeHelper.guestUserII)
          .end((err, res) => {
            newUser = res.body.user;
            newUSerToken = res.body.token;
            done();
          });
        });
        it('should return not found for invalid user id', (done) => {
          request.delete('/users/999')
          .set({ 'x-access-token': adminToken })
          .end((err, res) => {
            expect(res.body.message).to.equal('User Not Found');
            expect(res.status).to.equal(404);
            done();
          });
        });
        // it('should fail when request is from a regular user', (done) => {
        //   request.delete(`/users/${regularUserI.id}`)
        //   .set({ 'x-access-token': regularToken })
        //   .end((err, res) => {
        //     expect(res.status).to.equal(403);
        //     expect(res.body.message).to
        //       .equal('You are not permitted to perform this action');
        //     done();
        //   });
        // });
        // it('allow admin to delete a user', (done) => {
        //   request.delete(`/users/${newUser.id}`)
        //   .set({ 'x-access-token': adminToken })
        //   .end((err, res) => {
        //     expect(res.status).to.equal(200);
        //     expect(res.body.message).to
        //       .equal('This account has been successfully deleted');
        //     done();
        //   });
        // });
        it('should not allow a deleted user to access any restricted route',
      (done) => {
        request.get('/users/')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message).to
              .equal('Unauthorized Access');
            done();
          });
      });
      });
      describe('Logout', () => {
        it('should logout successfully', (done) => {
          request.post('/users/logout')
        .set({ 'x-access-token': adminToken })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.message).to
              .equal('Successfully logged out!');
            done();
          });
        });
        it('should not allow user to get user after logout', (done) => {
          request.get('/users')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message).to
              .equal('Unauthorized Access');
            done();
          });
        });
      });
    });
  });
});

