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
    });
  });
});

