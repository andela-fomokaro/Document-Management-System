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
const regularUser2 = SpecHelper.specUser3;
const invalidDocument = SpecHelper.invalidDocument;
const roleDocument2 = SpecHelper.specDocument2;
const roleDocument = SpecHelper.specDocument3;
const privateDocument = SpecHelper.specDocument7;
const publicDocument = SpecHelper.specDocument5;

describe('Document API:', () => {
  let adminToken, regularToken, regular2Token;
  let roleDoc = {}, roleDoc2 = {}, privateDoc = {}, publicDoc = {};


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

  describe('Documents REQUESTS:', () => {
    describe('POST: (/api/documents) - ', () => {
      it('should allow admin user to create document', (done) => {
        request.post('/api/documents')
        .send(SpecHelper.specDocument1)
        .set({ Authorization: adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          SpecHelper.specDocument1.id = res.body.newDocument.id;
          done();
        });
      });

      it('should not create a document when required fields are invalid',
      (done) => {
        request.post('/api/documents')
          .send(invalidDocument)
          .set({ Authorization: regularToken })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.message).to
            .equal('An error occured');
            done();
          });
      });

      it(`should create a document with role access when required fields
      are valid`, (done) => {
        request.post('/api/documents')
          .send(roleDocument)
          .set({ Authorization: regularToken })
          .end((error, response) => {
            roleDoc = response.body;
            expect(roleDoc.newDocument.title).to.equal(roleDocument.title);
            expect(response.status).to.equal(201);
            roleDocument.id = response.body.newDocument.id;
            done();
          });
      });

      it(`should create a document with role access when required fields
      are valid`, (done) => {
        request.post('/api/documents')
          .send(roleDocument2)
          .set({ Authorization: adminToken })
          .end((error, response) => {
            roleDoc2 = response.body;
            expect(roleDoc2.newDocument.title).to.equal(roleDocument2.title);
            expect(response.status).to.equal(201);
            roleDocument2.id = response.body.newDocument.id;
            done();
          });
      });

      it(`should create a document with private access when required fields
      are valid`, (done) => {
        request.post('/api/documents')
          .send(privateDocument)
          .set({ Authorization: adminToken })
          .end((error, response) => {
            privateDoc = response.body;
            expect(privateDoc.newDocument.title).to.equal(privateDocument.title);
            expect(response.status).to.equal(201);
            privateDocument.id = response.body.newDocument.id;
            done();
          });
      });

      it(`should create a document with public access when required fields
      are valid`, (done) => {
        request.post('/api/documents')
          .send(publicDocument)
          .set({ Authorization: adminToken })
          .end((error, response) => {
            publicDoc = response.body;
            expect(publicDoc.newDocument.title).to.equal(publicDocument.title);
            expect(response.status).to.equal(201);
            publicDocument.id = response.body.newDocument.id;
            done();
          });
      });

      it('should create a document with same title and/or content', (done) => {
        request.post('/api/documents')
          .send(roleDocument)
          .set({ Authorization: adminToken })
          .end((error, response) => {
            roleDoc = response.body;
            expect(response.status).to.equal(201);
            roleDocument.id = response.body.newDocument.id;
            done();
          });
      });

      describe('GET: (/api/documents)', () => {
        it('should return all documents if user is admin', (done) => {
          request.get('/api/documents')
          .set({ Authorization: adminToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(Array.isArray(response.body.documents)).to.be.true;
            expect(response.body.documents.length).to.equal(6);
            done();
          });
        });

        it('should return public documents if user is not admin', (done) => {
          request.get('/api/documents')
          .set({ Authorization: regularToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(Array.isArray(response.body.documents)).to.be.true;
            expect(response.body.documents.length).to.be.greaterThan(0);
            done();
          });
        });
      });

      describe('GET: (/api/documents/:id)', () => {
        before((done) => {
          request.post('/api/users')
            .send(regularUser2)
            .end((err, res) => {
              regular2Token = res.body.token;
              done();
            });
        });

        it('should not return the document if id is invalid', (done) => {
          request.get('/api/documents/22234')
          .set({ Authorization: adminToken })
          .end((error, response) => {
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('Document Does Not Exist');
            done();
          });
        });

        it('should not return the document if id is non-integer', (done) => {
          request.get('/api/documents/aa')
          .set({ Authorization: adminToken })
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to
            .equal('An error occured');
            done();
          });
        });

        it(`should not return the document if document is private and
         user is not the owner and not an admin`, (done) => {
          request.get(`/api/documents/${privateDocument.id}`)
          .set({ Authorization: regularToken })
          .end((error, response) => {
            expect(response.status).to.equal(403);
            expect(response.body.message).to
            .equal('Unauthorized');
            done();
          });
        });

        it(`should return the document if document is private and
        user is the owner`, (done) => {
          request.get(`/api/documents/${SpecHelper.specDocument1.id}`)
          .set({ Authorization: adminToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            done();
          });
        });
        it('should not return the document if the document has role access and user is not the owner',
         (done) => {
           request.get(`/api/documents/${roleDocument2.id}`)
           .set({ Authorization: regular2Token })
           .end((error, response) => {
             expect(response.status).to.equal(403);
             done();
           });
         });
        it(`should return the document if document has role access and
            user has same role as the owner`, (done) => {
          request.get(`/api/documents/${roleDocument2.id}`)
          .set({ Authorization: adminToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            done();
          });
        });
      });

      describe('PUT: (/api/documents/:id)', () => {
        const fieldsToUpdate = {
          title: 'Diary',
          content: 'Its mostly about self-learning'
        };

        const adminUpdate = {
          title: 'Admin Diary',
          content: 'Its mostly about self-learning'
        };

        it('should not edit document if id is invalid', (done) => {
          request.put('/api/documents/76589')
          .set({ Authorization: adminToken })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('Document Does Not Exist');
            done();
          });
        });

        it('should not edit document if id is non-integer', (done) => {
          request.put('/api/documents/id')
          .set({ Authorization: adminToken })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to
            .equal('An error occured');
            done();
          });
        });
        it('should not edit document if user is not the owner', (done) => {
          request.put(`/api/documents/${privateDocument.id}`)
          .set({ Authorization: regularToken })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(403);
            expect(response.body.message).to
              .equal('You are not authorized');
            done();
          });
        });
        it('should not edit document if user is not the owner',
        (done) => {
          request.put(`/api/documents/${privateDocument.id}`)
          .set({ Authorization: regularToken })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(403);
            done();
          });
        });
        it('should not edit ownerId property of document',
      (done) => {
        const fieldToUpdate = { ownerId: 7 };
        request.put('/api/documents/3')
          .set({ Authorization: regularToken })
          .send(fieldToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(403);
            expect(response.body.message).to
            .equal('You are not authorized');
            done();
          });
      });
        it('should edit document if user is the owner',
      (done) => {
        request.put('/api/documents/2')
          .set({ Authorization: regularToken })
          .send(fieldsToUpdate)
          .end((error, response) => {
            const updatedDocument = response.body.updatedDocument;
            expect(response.status).to.equal(200);
            expect(updatedDocument.title).to.equal(fieldsToUpdate.title);
            expect(updatedDocument.content).to.equal(fieldsToUpdate.content);
            done();
          });
      });
        it('should edit document if user is an admin',
      (done) => {
        request.put('/api/documents/2')
          .set({ Authorization: adminToken })
          .send(adminUpdate)
          .end((error, response) => {
            const updatedDocument = response.body.updatedDocument;
            expect(response.status).to.equal(200);
            expect(updatedDocument.title).to.equal(adminUpdate.title);
            expect(updatedDocument.content).to.equal(adminUpdate.content);
            done();
          });
      });
      });

    // DELETE Requests - Delete specific document
      describe('DELETE: (/api/documents/:id)', () => {
        it('should not delete document if id is invalid', (done) => {
          request.delete('/api/documents/3773')
          .set({ Authorization: adminToken })
          .end((error, response) => {
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('Document Does Not Exist');
            done();
          });
        });

        it('should not delete document if id is non-integer', (done) => {
          request.delete('/api/documents/asdf')
          .set({ Authorization: adminToken })
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to
            .equal('An error occured');
            done();
          });
        });

        it('should not delete document if user is not the owner', (done) => {
          request.delete(`/api/documents/${SpecHelper.specDocument1.id}`)
          .set({ Authorization: regular2Token })
          .end((error, response) => {
            expect(response.status).to.equal(403);
            expect(response.body.message).to
              .equal('You are not authorized');
            done();
          });
        });

        it('Admin should be able to delete Private document', (done) => {
          request.delete(`/api/documents/${privateDocument.id}`)
          .set({ Authorization: adminToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.message).to
              .equal('Document deleted');
            done();
          });
        });

        it('Admin should be able to delete document with role based access', (done) => {
          request.delete(`/api/documents/${roleDocument2.id}`)
          .set({ Authorization: adminToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.message).to
              .equal('Document deleted');
            done();
          });
        });
      });


      describe('GET: (/api/search/documents?search) - ', () => {
        const search = 'Text', term = 'biggie';
        it('should not return document(s) if search term is empty', (done) => {
          request.get('/api/search/documents?search=')
          .set({ Authorization: regularToken })
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to
            .equal('Invalid Search Parameter!');
            done();
          });
        });

        it('should not return document(s) if search term doesn\'t match',
      (done) => {
        request.get(`/api/search/documents?search=${term}`)
          .set({ Authorization: adminToken })
          .end((error, response) => {
            expect(response.status).to.equal(404);
            expect(response.body.message).to
            .equal('Search Does Not Match');
            done();
          });
      });

        it('should return matching documents if search term match',
      (done) => {
        request.get(`/api/search/documents?search=${search}`)
          .set({ Authorization: adminToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(Array.isArray(response.body.documents)).to.be.true;
            expect(response.body.documents.length).to.be.greaterThan(0);
            done();
          });
      });

        it(`should search through all documents if user is admin
      and return matching documents if search term match`,
      (done) => {
        request.get(`/api/search/documents?search=${search}`)
          .set({ Authorization: adminToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(Array.isArray(response.body.documents)).to.be.true;
            expect(response.body.documents.length).to.be.greaterThan(0);
            done();
          });
      });

        it(`should search through documents with role access if user is owner
      or user have the same role as owner and return matching
      documents if search term match`,
      (done) => {
        const newSearch = 'YOYOL';
        request.get(`/api/search/documents?search=${newSearch}`)
          .set({ Authorization: regularToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(Array.isArray(response.body.documents)).to.be.true;
            expect(response.body.documents.length).to.be.greaterThan(0);
            done();
          });
      });
      });
    });
  });
});
