/* eslint-disable no-unused-expressions */
import supertest from 'supertest';
import chai from 'chai';
import app from '../../../test-server';
import Helper from '../helper/HelperSpec';
import db from '../../models';

const expect = chai.expect;
const request = supertest.agent(app);

const adminUser = Helper.specUser1;
const regularUser = Helper.specUser2;
const regularUser2 = Helper.specUser3;
const invalidDocument = Helper.invalidDocument;
const roleDocument2 = Helper.specDocument2;
const roleDocument = Helper.specDocument3;
const privateDocument = Helper.specDocument7;
const publicDocument = Helper.specDocument5;

const term = 'the';
describe('Document API:', () => {
  let adminToken, regularToken, regular2Token;
  const roleDoc = {}, privateDoc = {}, publicDoc = {};

  const fieldsToUpdate = {
    title: 'My God',
    content: 'Is An Awesome God'
  };
  const adminUpdate = {
    title: 'The Book Of Life',
    content: 'Contains Everything You Need To Know'
  };
  before((done) => {
    db.Roles.bulkCreate([Helper.adminRole, Helper.regularRole])
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
      it('should allow admin user create document', (done) => {
        request.post('/api/documents')
        .send(Helper.specDocument1)
        .set({ Authorization: adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to
            .equal('Your Document Has Been Created');
          Helper.specDocument1.id = res.body.document.id;
          done();
        });
      });

      it('should not create document when required fields are invalid',
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

      it(`should create document with role access when required fields
      are valid`, (done) => {
        request.post('/api/documents')
          .send(roleDocument)
          .set({ Authorization: regularToken })
          .end((error, response) => {
            roleDoc = response.body;
            expect(roleDoc.document.title).to.equal(roleDocument.title);
            expect(response.status).to.equal(201);
            roleDocument.id = response.body.document.id;
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
            expect(privateDoc.document.title).to.equal(privateDocument.title);
            expect(response.status).to.equal(201);
            privateDocument.id = response.body.document.id;
            done();
          });
      });

      it(`should create document with public access when required fields
      are valid`, (done) => {
        request.post('/api/documents')
          .send(publicDocument)
          .set({ Authorization: adminToken })
          .end((error, response) => {
            publicDoc = response.body;
            expect(publicDoc.document.title).to.equal(publicDocument.title);
            expect(response.status).to.equal(201);
            publicDocument.id = response.body.document.id;
            done();
          });
      });

      it('should create document with same title and content', (done) => {
        request.post('/api/documents')
          .send(roleDocument)
          .set({ Authorization: adminToken })
          .end((error, response) => {
            roleDoc = response.body;
            expect(response.status).to.equal(201);
            roleDocument.id = response.body.document.id;
            done();
          });
      });

      describe('GET: (/api/documents)', () => {
        it('should return all documents if user is an admin', (done) => {
          request.get('/api/documents')
          .set({ Authorization: adminToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(Array.isArray(response.body.documents)).to.be.true;
            expect(response.body.documents.length).to.equal(5);
            done();
          });
        });

        it('should return only public documents to a non-admin user accessing other documents', (done) => {
          request.get('/api/documents')
          .set({ Authorization: regularToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(Array.isArray(response.body.documents)).to.be.true;
            expect(response.body.documents.length).to.equal(3);
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

        it('should not return document if id does not exist', (done) => {
          request.get('/api/documents/1000')
          .set({ Authorization: adminToken })
          .end((error, response) => {
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('Document Does Not Exist');
            done();
          });
        });

        it('should not return document if id is an alphabet', (done) => {
          request.get('/api/documents/uvz')
          .set({ Authorization: adminToken })
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to
            .equal('An error occured');
            done();
          });
        });

        it(`should not return document to user if document 
        doesnt belong to user / user is not an admin`, (done) => {
          request.get(`/api/documents/${privateDocument.id}`)
          .set({ Authorization: regularToken })
          .end((error, response) => {
            expect(response.status).to.equal(403);
            expect(response.body.message).to
            .equal('The Document You Are Trying To Access Is Private');
            done();
          });
        });

        it(`should return document to user if document is private 
        and document belongs to owner`, (done) => {
          request.get(`/api/documents/${Helper.specDocument1.id}`)
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
        it(`should return the document if document has role access and current
            user has same role`, (done) => {
          request.get(`/api/documents/${roleDocument2.id}`)
          .set({ Authorization: adminToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            done();
          });
        });
      });

      describe('PUT: (/api/documents/:id)', () => {
        it('should not edit document if id is invalid', (done) => {
          request.put('/api/documents/1000')
          .set({ Authorization: adminToken })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('Document Not Found');
            done();
          });
        });

        it('should not edit document if id is an alphabet', (done) => {
          request.put('/api/documents/life')
          .set({ Authorization: adminToken })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to
            .equal('An error occured');
            done();
          });
        });
        it('should not edit document if document dosent belong to user', (done) => {
          request.put(`/api/documents/${privateDocument.id}`)
          .set({ Authorization: regularToken })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(403);
            expect(response.body.message).to
              .equal('You Cannot View Document');
            done();
          });
        });
        it('should not edit private document if document doesnt belong to the user',
        (done) => {
          request.put(`/api/documents/${privateDocument.id}`)
          .set({ Authorization: regularToken })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(403);
            expect(response.body.message).to
              .equal('You Cannot View Document');
            done();
          });
        });
      });
      it('should edit document if document belongs to user',
      (done) => {
        request.put('/api/documents/2')
          .set({ Authorization: regularToken })
          .send(fieldsToUpdate)
          .end((error, response) => {
            const updatedDocument = response.body.documentUpdate;
            expect(response.status).to.equal(200);
            expect(updatedDocument.title).to.equal(fieldsToUpdate.title);
            expect(updatedDocument.content).to.equal(fieldsToUpdate.content);
            expect(response.body.message).to
              .equal('Document Updated Successfully');
            done();
          });
      });
      it('should edit document if user editing document is an admin',
      (done) => {
        request.put('/api/documents/2')
          .set({ Authorization: adminToken })
          .send(adminUpdate)
          .end((error, response) => {
            const updatedDocument = response.body.documentUpdate;
            expect(response.status).to.equal(200);
            expect(response.body.message).to
              .equal('Document Updated Successfully');
            expect(updatedDocument.title).to.equal(adminUpdate.title);
            expect(updatedDocument.content).to.equal(adminUpdate.content);
            done();
          });
      });
    });

    describe('DELETE: (/api/documents/:id)', () => {
      it('should not delete document if id supplied is invalid', (done) => {
        request.delete('/api/documents/1000')
          .set({ Authorization: adminToken })
          .end((error, response) => {
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('Document Not Found');
            done();
          });
      });

      it('should not delete document if id is an alphabet', (done) => {
        request.delete('/api/documents/xyz')
          .set({ Authorization: adminToken })
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to
            .equal('An error occured');
            done();
          });
      });

      it('should not delete document if document does not belong to user', (done) => {
        request.delete(`/api/documents/${Helper.specDocument1.id}`)
          .set({ Authorization: regular2Token })
          .end((error, response) => {
            expect(response.status).to.equal(403);
            expect(response.body.message).to
              .equal('You Are Not Allowed To Delete This Document');
            done();
          });
      });

      it('Admin should be able to delete Private document', (done) => {
        request.delete(`/api/documents/${privateDocument.id}`)
          .set({ Authorization: adminToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.message).to
              .equal('Document Successfully Deleted');
            done();
          });
      });

      it('Admin should be able to delete document with role based access', (done) => {
        request.delete(`/api/documents/${roleDocument2.id}`)
          .set({ Authorization: adminToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.message).to
              .equal('Document Successfully Deleted');
            done();
          });
      });
    });


    describe('GET: (/api/search/documents?search) - ', () => {
      const search = 'Text';
      it('should not return document if search term is empty', (done) => {
        request.get('/api/search/documents?search=')
          .set({ Authorization: regularToken })
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to
            .equal('User Search Does Not Search');
            done();
          });
      });

      it('should not return document if search term does not match',
      (done) => {
        request.get(`/api/search/documents?search=${term}`)
          .set({ Authorization: adminToken })
          .end((error, response) => {
            expect(response.status).to.equal(404);
            expect(response.body.message).to
            .equal('Search Term Not Found');
            done();
          });
      });

      it('should return matching documents if search term match',
      (done) => {
        request.get(`/api/search/documents?search=${term}`)
          .set({ Authorization: adminToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(Array.isArray(response.body.documents)).to.be.true;
            expect(response.body.documents.length).to.be.greaterThan(0);
            done();
          });
      });

      it(`should search through documents if user is an admin
      and should return matching documents`,
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

      it(`should search through documents with role access if document belongs to user
      / user has same role access and should return matching documents`,
      (done) => {
        const newTerm = 'is';
        request.get(`/api/search/documents?search=${newTerm}`)
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
