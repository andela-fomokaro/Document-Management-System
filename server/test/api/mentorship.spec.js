import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../server';


const should = chai.should();

chai.use(chaiHttp);

describe('Get users without authorization', () => {
  it('should not have access', (done) => {
    chai.request(app)
    .get('/users')
    .end((err, res) => {
      res.should.have.status(401);
      done();
    });
  });
});
