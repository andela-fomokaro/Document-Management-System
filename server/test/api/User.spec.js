/* eslint-disable no-unused-expressions */
import supertest from 'supertest';
import chai from 'chai';
import app from '../../../test-server';
import SpecHelper from '../helper/SpecHelper';
import db from '../../models';

const request = supertest.agent(app);
const expect = chai.expect;

const adminUser = SpecHelper.specUser1;
const regularUser = SpecHelper.specUser2;
const regularUser2 = SpecHelper.specUser3;
const regularUser3 = SpecHelper.specUser4;
const invalidUser = SpecHelper.invalidUser;

describe('Document API:', () => {
  let adminToken, regularToken;
  const user = {};
  before((done) => {
    db.Roles.bulkCreate([SpecHelper.adminRole, SpecHelper.regularRole])
      .then((roles) => {
        adminUser.roleId = roles[0].id;
        regularUser.roleId = roles[1].id;
        db.Users.create(adminUser)
          .then(() => {
            request.post('/api/users/login')
              .send(adminUser)
              .end((err, res) => {
                adminToken = res.body.token;
                done();
              });
          });
      });
  });

  after(() => {
    db.Roles.destroy({ where: {} });
  });

  describe('Users REQUESTS:', () => {
    describe('POST: (/api/users/) - ', () => {
      it('should create new user if user dosent exist', (done) => {
        request.post('/api/users/')
        .send(regularUser)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('User was created successfully');
          done();
        });
      });
      it('should create new user if user dosent exist', (done) => {
        request.post('/api/users/')
        .send(regularUser2)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('User was created successfully');
          done();
        });
      });
    });
    it('should not create invalid user', (done) => {
      request.post('/api/users/')
      .send(invalidUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('An error occured. Invalid parameters, try again!');
        done();
      });
    });
  });


  describe('POST: (/api/users/login) - ', () => {
    it('should not login a user if required fields are invalid', (done) => {
      request.post('/api/users/login')
          .send(invalidUser)
          .end((error, response) => {
            expect(response.status).to.equal(401);
            expect(response.body.message).to
            .equal('Please enter a valid email or password to log in');
            done();
          });
    });

    it('should not login a user if user details does not exist', (done) => {
      request.post('/api/users/login')
          .send(regularUser3)
          .end((error, response) => {
            expect(response.status).to.equal(401);
            expect(response.body.message).to
            .equal('Please enter a valid email or password to log in');
            done();
          });
    });
    it('should login a user if user details exists', (done) => {
      request.post('/api/users/login')
          .send(adminUser)
          .end((error, response) => {
            adminToken = response.body.token;
            expect(response.status).to.equal(200);
            request.post('/api/users/login')
              .send(regularUser)
              .end((err, res) => {
                regularToken = res.body.token;
                regularUser.id = res.body.userId;
                expect(res.status).to.equal(200);
                done();
              });
          });
    });
  });

  describe('POST: (/api/users/logout) - ', () => {
    it('should logout a user if valid token is provided', (done) => {
      request.post('/api/users/logout')
          .set({ Authorization: regularToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.message).to.equal('Successfully logged out!');
            done();
          });
    });
  });

  describe('GET: (/api/users) - ', () => {
    it('should return all users if user is admin', (done) => {
      request.get('/api/users')
          .set({ Authorization: adminToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.users.count).to.equal(3);
            done();
          });
    });

    it('should not return all users if user is a regular user', (done) => {
      request.get('/api/users')
          .set({ Authorization: regularToken })
          .end((error, response) => {
            expect(response.status).to.equal(403);
            expect(Array.isArray(response.body.users)).to.be.false;
            expect(response.body.message).to
            .equal('Admin access is required!');
            done();
          });
    });

    describe('GET: (/api/users/:id) - ', () => {
      it(`should not return the user if user is not an admin
      and user is not the current user`, (done) => {
        request.get(`/api/users/${user.id}`)
          .set({ Authorization: regularToken })
          .end((error, response) => {
            expect(response.status).to.equal(401);
            expect(response.body.message).to
            .equal('An error occured. Invalid parameters, try again!');
            done();
          });
      });

      it('should return the user when user is current user', (done) => {
        request.get('/api/users/6')
          .set({ Authorization: adminToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            done();
          });
      });
      it('should not return the user if id is non-integer', (done) => {
        request.get('/api/users/1q')
          .set({ Authorization: adminToken })
          .end((error, response) => {
            expect(response.status).to.equal(401);
            expect(response.body.message).to
            .equal('An error occured. Invalid parameters, try again!');
            done();
          });
      });
      it('should not return the user if id is invalid', (done) => {
        request.get('/api/users/40000000')
          .set({ Authorization: adminToken })
          .end((error, response) => {
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('User Does Not Exist');
            done();
          });
      });

      describe('PUT: (/api/users/:id) - ', () => {
        it('should not edit user if id is invalid', (done) => {
          const fieldsToUpdate =
            {
              title: 'LadiesInTech',
              content: 'We love coding.'
            };
          request.put('/api/users/45000032')
          .set({ Authorization: regularToken })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(403);
            expect(response.body.message).to.equal('Admin access is required!');
            done();
          });
        });

        it('should not edit user if user isnt an admin', (done) => {
          const fieldsToUpdate = { id: 1 };
          request.put(`/api/users/${user.id}`)
          .set({ Authorization: regularToken })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(403);
            expect(response.body.message).to
            .equal('Admin access is required!');
            done();
          });
        });
        it('should not edit the user if id is non-integer', (done) => {
          request.put('/api/users/1q')
          .set({ Authorization: adminToken })
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to
            .equal('An error occured. Invalid parameters, try again!');
            done();
          });
        });

      //   it(`should edit the user's property if user is admin
      // and id is valid`, (done) => {
      //     const fieldsToUpdate =
      //       {
      //         username: 'baby',
      //         email: 'baby@test.com'
      //       };
      //     request.put('/api/users/2')
      //     .set({ Authorization: adminToken })
      //     .send(fieldsToUpdate)
      //     .end((error, response) => {
      //       const updatedFields = regularUser;
      //       console.log(updatedFields);
      //       expect(response.status).to.equal(200);
      //       expect(updatedFields.email).to.equal(fieldsToUpdate.email);
      //       done();
      //     });
        // });
      // it('should edit the user property if user is the current user', (done) => {
      //   const fieldsToUpdate =
      //   { name: 'Mercy Ade',
      //   email: 'mercy.oseni@test.com'
      // };
      //   request.put('/api/users/1')
      //     .set({ Authorization: adminToken })
      //     .send(fieldsToUpdate)
      //     .end((error, response) => {
      //       const updatedUser = response.body.adminUser;
      //       expect(response.status).to.equal(200);
      //       expect(updatedUser.name).to.equal(fieldsToUpdate.name);
      //       expect(updatedUser.email).to.equal(fieldsToUpdate.email);
      //       done();
      //     });

      // });

      // DELETE requests - Delete specific user
        describe('DELETE: (/api/users/:id) - ', () => {
          it('should not delete user if id is non-integer', (done) => {
            request.delete('/api/users/2ab')
          .set({ Authorization: adminToken })
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to
            .equal('An error occured. Invalid parameters, try again!');
            done();
          });
          });

          it('should not delete user if id is invalid', (done) => {
            request.delete('/api/users/2758903')
          .set({ Authorization: adminToken })
          .end((error, response) => {
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('User Does Not Exist');
            done();
          });
          });

          it(`should not delete user when id is valid and user is not
      the current user`, (done) => {
            request.delete(`/api/users/${user.id}`)
          .set({ Authorization: regularToken })
          .end((error, response) => {
            expect(response.status).to.equal(403);
            expect(response.body.message).to
              .equal('Admin access is required!');
            done();
          });
          });

          it('should not delete default admin user account', (done) => {
            request.delete('/api/users/1')
          .set({ Authorization: regularToken })
          .end((error, response) => {
            expect(response.status).to.equal(403);
            expect(response.body.message).to
              .equal('Admin access is required!');
            done();
          });
          });

          it('should delete user when id is valid and user is admin', (done) => {
            request.delete('/api/users/6')
          .set({ Authorization: adminToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.message).to
              .equal('User deleted successfully.');
            done();
          });
          });
        });

        describe('GET: (/api/users/:id/documents) - ', () => {
          it('should not return user\'s documents if id is invalid',
      (done) => {
        request.get('/api/users/324785/documents')
          .set({ Authorization: regularToken })
          .end((error, response) => {
            expect(response.body.message).to
            .equal('Admin access is required!');
            done();
          });
      });

          it('should not return user\'s documents if id is non-integer',
      (done) => {
        request.get('/api/users/22/documents')
          .set({
            Authorization: regularToken
          })
          .end((error, response) => {
            expect(response.body.message).to
            .equal('Admin access is required!');
            done();
          });
      });

          it('should not return document that is not present in the database', (done) => {
            request.get('/api/users/6/documents')
          .set({
            Authorization: adminToken
          })
          .end((error, response) => {
            expect(response.status).to.equal(404);
            expect(Array.isArray(response.body.documents)).to.be.false;
            done();
          });
          });

          it('should not return user\'s documents if user is not owner', (done) => {
            request.get('/api/users/3/documents')
          .set({
            Authorization: regularToken
          })
          .end((error, response) => {
            expect(response.status).to.equal(403);
            expect(response.body.message).to
              .equal('Admin access is required!');
            done();
          });
          });
        });

        describe('GET: (/api/search/users?search) - ', () => {
          const search = 'faith', term = 'abc';
          it('should not return user(s) if search term is empty', (done) => {
            request.get('/api/search/users?search=')
          .set({ Authorization: adminToken })
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to
            .equal('Invalid Search Parameter!');
            done();
          });
          });

          it('should not return user(s) if search term doesn\'t match', (done) => {
            request.get(`/api/search/users?search=${term}`)
          .set({ Authorization: regularToken })
          .end((error, response) => {
            expect(response.status).to.equal(404);
            expect(response.body.message).to
            .equal('Search Does Not Match Any User!');
            done();
          });
          });
        });
      });
    });
  });
});
