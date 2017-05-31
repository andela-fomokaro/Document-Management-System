/* eslint-disable no-unused-expressions */
import supertest from 'supertest';
import chai from 'chai';
import app from '../../../test-server';
import SpecHelper from '../helper/HelperSpec';
import db from '../../models';

const request = supertest.agent(app);
const expect = chai.expect;

const adminUser = SpecHelper.specUser1;
const regularUser = SpecHelper.specUser2;
const regularUser2 = SpecHelper.specUser3;
const regularUser3 = SpecHelper.specUser4;
const invalidUser = SpecHelper.invalidUser;

const fieldsToUpdate =
  {
    title: 'Amoralene',
    content: 'Amoralene'
  };
const faith = 'gaye';

describe('USER API:', () => {
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
      it('should create new user if user does not exist', (done) => {
        request.post('/api/users/')
        .send(regularUser)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('User Has Been Successfully Created');
          done();
        });
      });
    });
    it('should not create invalid user', (done) => {
      request.post('/api/users/')
      .send(invalidUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('An error occured');
        done();
      });
    });
    it('should not re-create an existing user', (done) => {
      request.post('/api/users/')
      .send(adminUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('This User Already exist');
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
            .equal('Login details entered are incorrect');
            done();
          });
    });

    it('should not login a user if user details does not exist', (done) => {
      request.post('/api/users/login')
          .send(regularUser3)
          .end((error, response) => {
            expect(response.status).to.equal(401);
            expect(response.body.message).to
            .equal('Login details entered are incorrect');
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
                expect(response.body.message).to
            .equal('You have sucessfully logged in');
                done();
              });
          });
    });
  });


  describe('GET: (/api/users) - ', () => {
    it('should return all users if user is admin', (done) => {
      request.get('/api/users')
          .set({ Authorization: adminToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.message).to
            .equal('Successfull');
            expect(response.body.users.count).to.equal(2);
            done();
          });
    });
    it('should  not return list of users if user is not an admin', (done) => {
      request.get('/api/users')
          .set({ Authorization: regularToken })
          .end((error, response) => {
            expect(response.status).to.equal(403);
            done();
          });
    });
  });

  describe('GET: (/api/users/:id) - ', () => {
    it(`should not return user if user
       is not an admin / user does not have correct access-token`, (done) => {
      request.get(`/api/users/${user.id}`)
          .set({ Authorization: regularToken })
          .end((error, response) => {
            expect(response.status).to.equal(401);
            expect(response.body.message).to
            .equal('An error occured');
            done();
          });
    });

    it('should not return user if id is an alphabet', (done) => {
      request.get('/api/users/huh')
          .set({ Authorization: adminToken })
          .end((error, response) => {
            expect(response.status).to.equal(401);
            expect(response.body.message).to
            .equal('An error occured');
            done();
          });
    });
    it('should not return the user if id is invalid', (done) => {
      request.get('/api/users/786')
          .set({ Authorization: adminToken })
          .end((error, response) => {
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('User Does Not Exist');
            done();
          });
      it('should not return user details if user does not correct access token', (done) => {
        request.get('/api/users/1')
          .set({ Authorization: regularToken })
          .end((error, response) => {
            expect(response.status).to.equal(403);
            expect(response.body.message).to.equal('You cannot access user profile');
            done();
          });
      });
    });

    describe('GET: (/api/search/users?search) - ', () => {
      const term = 'abc';
      it('should not return user if search term is empty', (done) => {
        request.get('/api/search/users?search=')
          .set({ Authorization: adminToken })
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to
            .equal('User Search Does Not Search');
            done();
          });
      });

      it('should not return user if search term does not match',
           (done) => {
             request.get(`/api/search/users?search=${term}`)
          .set({ Authorization: regularToken })
          .end((error, response) => {
            expect(response.status).to.equal(404);
            expect(response.body.message).to
            .equal('Search Term Not Found');
            done();
          });
           });
      it('should return user search if search term is correct',
           (done) => {
             request.get(`/api/search/users?search=${faith}`)
          .set({ Authorization: adminToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            done();
          });
           });
    });

    describe('PUT: (/api/users/:id) - ', () => {
      it('should not edit user if id supplied is invalid', (done) => {
        request.put('/api/users/678')
          .set({ Authorization: regularToken })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('User Does Not Exist');
            done();
          });
      });

      it('should not edit user if user does not have correct access-token', (done) => {
        request.put('/api/users/1')
          .set({ Authorization: regularToken })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(401);
            expect(response.body.message).to
            .equal('You are not authorized to update user profile');
            done();
          });
      });
      it('should not edit the user if id is an alphabet', (done) => {
        request.put('/api/users/gth')
          .set({ Authorization: adminToken })
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to
            .equal('An error occured');
            done();
          });
      });
      it('should edit user if user access-token is correct', (done) => {
        request.put('/api/users/1')
          .set({ Authorization: adminToken })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.message).to.equal('Update Successful!');
            done();
          });
      });
    });


    describe('DELETE: (/api/users/:id) - ', () => {
      it('should not delete user if id supplied is an object', (done) => {
        request.delete('/api/users/juj')
          .set({ Authorization: adminToken })
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to
            .equal('An error occured');
            done();
          });
      });

      it('should not delete user if id supplied is invalid', (done) => {
        request.delete('/api/users/909')
          .set({ Authorization: adminToken })
          .end((error, response) => {
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('User Does Not Exist');
            done();
          });
      });

      it(`should not delete user when id is valid 
      and user does not have corect access-token`, (done) => {
        request.delete('/api/users/3')
          .set({ Authorization: regularToken })
          .end((error, response) => {
            expect(response.status).to.equal(403);
            expect(response.body.message).to
              .equal('You dont have access to delete user');
            done();
          });
      });

      it('should not delete default admin user account', (done) => {
        request.delete('/api/users/1')
          .set({ Authorization: regularToken })
          .end((error, response) => {
            expect(response.status).to.equal(403);
            expect(response.body.message).to
              .equal('You dont have access to delete user');
            done();
          });
      });

      it('should delete user when id is valid and user is admin',
           (done) => {
             request.delete('/api/users/6')
          .set({ Authorization: adminToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.message).to
              .equal('User deleted successfully');
            done();
          });
           });
    });

    describe('GET: (/api/users/:id/documents) - ', () => {
      it('should not return user documents if id is invalid',
      (done) => {
        request.get('/api/users/100/documents')
          .set({ Authorization: regularToken })
          .end((error, response) => {
            expect(response.body.message).to
            .equal(undefined);
            done();
          });
      });

      it('should not return user documents if id is an alphabet',
      (done) => {
        request.get('/api/users/jhy/documents')
          .set({
            Authorization: adminToken
          })
          .end((error, response) => {
            expect(response.body.message).to
            .equal('An error occured');
            done();
          });
      });
      it('should return user documents if id is valid',
      (done) => {
        request.get('/api/users/1/documents')
          .set({
            Authorization: adminToken
          })
          .end((error, response) => {
            expect(response.status).to
            .equal(200);
            done();
          });
      });
    });
  });
});
