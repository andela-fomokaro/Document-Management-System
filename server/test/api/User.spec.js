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
        const uniqueUser = Object.assign({}, fakeHelper.guestUserIII);
        uniqueUser[field] = fakeHelper.regularUserI[field];
        it(`should fail when already existing ${field} is supplied`, (done) => {
          request.post('/users')
            .send(uniqueUser)
            .end((err, res) => {
              console.log(res.body);
              expect(res.status).to.equal(409);
              expect(res.body.message)
                .to.equal(`${field} already exist please choose another ${field}`);
              done();
            });
        });
      });
      emptyValue.forEach((field) => {
        const invalidUser = Object.assign({}, fakeHelper.regularUserI);
        invalidUser[field] = '';
        it(`should fail when ${field} is invalid`, (done) => {
          request.post('/users')
            .send(invalidUser)
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body.message).to
                .equal(`Enter a valid ${field}`);
              done();
            });
        });
      });
    });
  });
});
