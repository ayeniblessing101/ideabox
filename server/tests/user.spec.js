import supertest from 'supertest';
import chai from 'chai';
import User from '../models/User';
import app from '../app';
import users from '../tests/mockData/users.json';

const { expect } = chai;
const request = supertest(app);

describe('User Controller', () => {
  before((done) => {
    User.remove({}, () => {
      done();
    });
  });

  describe('when a user sign up', () => {
    it('should return the user details and authentication token', (done) => {
      request
        .post('/api/v1/user/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send(users[0])
        .expect(201)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.user.userId).to.be.a('string');
          expect(res.body.user.firstname).to.equal(users[0].firstname);
          expect(res.body.user.lastname).to.equal(users[0].lastname);
          expect(res.body.user.email).to.equal(users[0].email);
          done();
        });
    });
  });

  describe('when a user sign up with an existing email', () => {
    it('should return Email already exist', (done) => {
      request
        .post('/api/v1/user/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send(users[0])
        .expect(409)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          expect(res.body).to.have.a.property('error', 'Email already exist');
          done();
        });
    });
  });

  describe('when a user sign up with an invalid email', () => {
    it('should return Invalid email', (done) => {
      request
        .post('/api/v1/user/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          ...users[0],
          email: 'ayeni',
        })
        .expect(400)
        .end((err, res) => {
          expect(JSON.parse(res.error.text).errors[0].msg).to.equal('Invalid email', );
          done();
        });
    });
  });
  describe('when a user sign up with an invalid firstname and lastname', () => {
    it('should return Invalid first name and Invalid last name', (done) => {
      request
        .post('/api/v1/user/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          ...users[0],
          firstname: '12345',
          lastname: '@r5679',
        })
        .expect(400)
        .end((err, res) => {
          expect(JSON.parse(res.error.text).errors[0].msg).to.equal('Invalid first name', );
          expect(JSON.parse(res.error.text).errors[1].msg).to.equal('Invalid last name', );
          done();
        });
    });
  });
});