
import supertest from 'supertest';
import chai from 'chai';
import app from '../../../test-server';
import Helper from '../helper/HelperSpec';
import db from '../../models';

const expect = chai.expect;
const request = supertest.agent(app);
const admin = Helper.specUser1;
const regularUser = Helper.specUser2;
const author = Helper.authorRole;


let adminToken;
let regularToken;
let authorToken;


describe('ROLE API:', () => {
  before((done) => {
    db.Roles.bulkCreate([Helper.adminRole, Helper.regularRole, Helper.contributorRole])
      .then((roles) => {
        admin.roleId = roles[0].id;
        regularUser.roleId = roles[1].id;
        regularUser.contributorRole = roles[2].id;
        db.Users.create(admin)
          .then(() => {
            request.post('/api/users/login')
              .send(admin)
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
    const roles = {};

    before((done) => {
      request.post('/api/users/login')
      .send(admin)
      .end((error, response) => {
        adminToken = response.body.token;
        done();
      });
    });

    describe('ROLES REQUESTS:', () => {
      describe('POST: (/api/roles)', () => {
        it('should not create role if user logged in isnt an admin', (done) => {
          const newRole = { title: 'printer', id: 4 };
          request.post('/api/roles')
          .send(newRole)
          .end((error, response) => {
            expect(response.status).to.equal(401);
            done();
          });
        });
      });

      it('should not create role if role already exist', (done) => {
        const newRole = { title: 'admin' };
        request.post('/api/roles')
          .set({ Authorization: adminToken })
          .send(newRole)
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to
            .equal('Role Title Already Exist');
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
      it('should not return role when id passed is invalid', (done) => {
        request.get('/api/roles/20')
          .set({ Authorization: adminToken })
          .end((error, response) => {
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('Role Does Not Exist');
            done();
          });
      });
    });

    it('should not return role when id passed is an alphabet', (done) => {
      request.get('/api/roles/abc')
          .set({ Authorization: adminToken })
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to
            .equal('An error occured');
            done();
          });
    });
    it('should return role when id passed is valid', (done) => {
      request.get('/api/roles/1')
          .set({ Authorization: adminToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            done();
          });
    });

    describe('PUT: (/api/roles/:id)', () => {
      it('should not edit role if id is invalid', (done) => {
        const fieldsToUpdate = { title: 'intermediate' };
        request.put('/api/roles/45')
          .set({ Authorization: adminToken })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('Role Does Not Exist');
            done();
          });
      });

      it('should not edit role if id is non-integer', (done) => {
        const fieldsToUpdate = { title: 'subsidiary' };
        request.put('/api/roles/5s')
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
            .equal('Cannot Edit Default Roles');
            done();
          });
      });

      it('should not edit default regular role', (done) => {
        const fieldsToUpdate = { title: 'regular' };
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
      it('should update non default roles', (done) => {
        const fieldsToUpdate = { title: 'regular 2' };
        request.put('/api/roles/3')
          .set({ Authorization: adminToken })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.message).to
            .equal('Update Successful');
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

      it('should not delete roleid if roleid does not exist', (done) => {
        request.delete('/api/roles/100')
          .set({
            Authorization: adminToken
          })
          .end((error, response) => {
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('Role Does Not Exist');
            done();
          });
      });

      it('should not delete role if id is an alphabet', (done) => {
        request.delete('/api/roles/abc')
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
            .equal('Cannot Delete Default Roles');
            done();
          });
      });

      it('should not delete default regular role', (done) => {
        request.delete('/api/roles/2')
          .set({ Authorization: adminToken })
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to
            .equal('Cannot Delete Default Roles');
            done();
          });
      });
    });
  });
});
