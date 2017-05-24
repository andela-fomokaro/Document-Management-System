/* eslint-disable no-unused-expressions */
import supertest from 'supertest';
import chai from 'chai';
import app from '../../../test-server';
import SpecHelper from '../helper/SpecHelper';
import db from '../../models';

const expect = chai.expect;
const request = supertest.agent(app);
const adminUser = SpecHelper.specUser1;
const regularUser = SpecHelper.specUser2;
const author = SpecHelper.authorRole;


let adminToken, regularToken, authorToken;

describe('ROLE API:', () => {
  before((done) => {
    db.Roles.bulkCreate([SpecHelper.adminRole, SpecHelper.regularRole, SpecHelper.contributorRole])
      .then((roles) => {
        adminUser.roleId = roles[0].id;
        regularUser.roleId = roles[1].id;
        regularUser.contributorRole = roles[2].id;
        db.Users.create(adminUser)
          .then(() => {
            request.post('/api/users/login')
              .send(adminUser)
              .end((err, res) => {
                adminToken = res.body.token;
                db.Users.create(regularUser)
                  .then(() => {
                    request.post('/api/users/login')
                      .send(regularUser)
                      .end((err1, res1) => {
                        regularToken = res1.body.token;
                        done();
                      });
                  });
              });
          });
      });
  });

  after(() => {
    db.Roles.destroy({ where: {} });
  });

  describe('Role API:', () => {
    let adminUserToken;
    const roles = {};

    before((done) => {
      request.post('/api/users/login')
      .send(adminUser)
      .end((error, response) => {
        adminUserToken = response.body.token;
        done();
      });
    });

    describe('ROLES REQUESTS:', () => {
      describe('POST: (/api/roles)', () => {
        it('should create a role if user is not an admin', (done) => {
          const newRole = { title: 'superAdmin', id: 4 };
          request.post('/api/roles')
          .send(newRole)
          .end((error, response) => {
            expect(response.status).to.equal(401);
            done();
          });
        });
      });

      it('should not create a role if role already exist', (done) => {
        const newRole = { title: 'regular' };
        request.post('/api/roles')
          .set({ Authorization: adminToken })
          .send(newRole)
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to
            .equal('Enter unique parameters');
            done();
          });
      });
    });

    describe('GET: (/api/roles)', () => {
      it('should return all roles', (done) => {
        request.get('/api/roles')
          .set({ Authorization: adminToken })
          .end((error, response) => {
            expect(response.status).to.equal(201);
            done();
          });
      });
    });

    describe('GET: (/api/roles/:id)', () => {
      it('should not return the role when id is invalid', (done) => {
        request.get('/api/roles/2890')
          .set({ Authorization: adminToken })
          .end((error, response) => {
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('Role Does Not Exist');
            done();
          });
      });
    });

    it('should not return the role when id is non-integer', (done) => {
      request.get('/api/roles/abc')
          .set({ Authorization: adminToken })
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to
            .equal('An error occured');
            done();
          });
    });
    it('should return the role when id is valid', (done) => {
      request.get('/api/roles/2')
          .set({ Authorization: adminToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            done();
          });
    });

    describe('PUT: (/api/roles/:id)', () => {
      it('should not edit role if id is invalid', (done) => {
        const fieldsToUpdate = { title: 'intermediate' };
        request.put('/api/roles/3382')
          .set({ Authorization: adminToken })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('Role Does Not Exist');
            done();
          });
      });

      it('should not edit role if id is non-integer', (done) => {
        const fieldsToUpdate = { title: 'intermediate' };
        request.put('/api/roles/1m')
          .set({ Authorization: adminToken })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to
            .equal('An error occured');
            done();
          });
      });

      it('should not edit default admin role', (done) => {
        const fieldsToUpdate = { title: 'admin' };
        request.put('/api/roles/1')
          .set({ Authorization: adminToken })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to
            .equal('Validation error');
            done();
          });
      });

      it('should not edit default regular role', (done) => {
        const fieldsToUpdate = { title: 'casual' };
        request.put('/api/roles/2')
          .set({ Authorization: adminToken })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to
            .equal('An error occured');
            done();
          });
      });

      it('should not edit roles if role already exist', (done) => {
        const fieldsToUpdate = { title: 'basic' };
        request.put(`/api/roles/${roles.id}`)
          .set({ Authorization: adminToken })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to
            .equal('An error occured');
            done();
          });
      });
    });

    describe('DELETE: (/api/roles/:id)', () => {
      before((done) => {
        request.post('/api/roles')
            .send(author)
            .end((err, res) => {
              authorToken = res.body.token;
              done();
            });
      });

      it('should not delete role if id is invalid', (done) => {
        request.delete('/api/roles/8728')
          .set({
            Authorization: adminToken
          })
          .end((error, response) => {
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('Role Does Not Exist');
            done();
          });
      });

      it('should not delete role if id is non-integer', (done) => {
        request.delete('/api/roles/5r')
          .set({
            Authorization: adminToken
          })
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to
            .equal('An error occured');
            done();
          });
      });

      it('should not delete default admin role', (done) => {
        request.delete('/api/roles/1')
          .set({ Authorization: adminToken })
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to
            .equal('An error occured');
            done();
          });
      });

      it('should not delete default regular role', (done) => {
        request.delete('/api/roles/2')
          .set({ Authorization: adminToken })
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to
            .equal('An error occured');
            done();
          });
      });
    });
  });
});
