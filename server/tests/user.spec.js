import supertest from 'supertest';
import chai from 'chai';
import User from '../models/User';
import app from '../app';
import users from '../tests/mockData/users.json';

const { expect } = chai;
const request = supertest(app);
let jwtToken, Id;

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
          Id = res.body.user.userId;
          jwtToken = res.body.token;
          expect(res.body).to.be.an('object');
          expect(res.body.user).to.be.an('object');
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

  describe('when a user signin with email field blank ', () => {
    it('should return email is required', (done) => {
      request
        .post('/api/v1/user/login')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send(users[3])
        .expect(400)
        .end((err, res) => {
          expect(JSON.parse(res.error.text).errors[0].msg).to.equal('email is required', );
          done();
        });
    });
  });

  describe('when a user signin with password field blank ', () => {
    it('should return password is required', (done) => {
      request
        .post('/api/v1/user/login')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send(users[3])
        .expect(400)
        .end((err, res) => {
          expect(JSON.parse(res.error.text).errors[2].msg).to.equal('password is required', );
          done();
        });
    });
  });

  describe('when a user signin with an invalid email', () => {
    it('should return Invalid email', (done) => {
      request
        .post('/api/v1/user/login')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send(users[2])
        .expect(400)
        .end((err, res) => {
          expect(res.body.errors[0].msg).to.equal('Invalid email');
          done();
        });
    });
  });

  describe('when a user signin with a valid email and password', () => {
    it('should return authentication token', (done) => {
      request
        .post('/api/v1/user/login')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send(users[1])
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('token');
          expect(res.body.token).to.be.a('string');
          expect(res.body).to.have.a.property('token', res.body.token);
          done();
        });
    });
  });

  describe('when a user signin with a wrong email', () => {
    it('should return User not Found', (done) => {
      request
        .post('/api/v1/user/login')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          ...users[1],
          userEmail: 'tomiwa@gmail45.com',
        })
        .expect(404)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          expect(res.body).to.have.a.property('error', 'User not Found');
          done();
        });
    });
  });

  describe('when a user signin with a wrong password', () => {
    it('should return Invalid Credential', (done) => {
      request
        .post('/api/v1/user/login')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          ...users[1],
          userPassword: 'Welcome3000##',
        })
        .expect(404)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.a.property('error', 'Invalid Credential');
          done();
        });
    });
  });

  describe('when a user update their profile with a firstname, lastname and email field blank', () => {
    it('should return a firstname, lastname and email is required', (done) => {
      request
        .put(`/api/v1/user/${Id}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', jwtToken)
        .send({
          ...users[0],
          firstname: '',
          lastname: '',
          email: '',
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(JSON.parse(res.error.text).errors[2].msg).to.equal('firstname is required', );
          expect(JSON.parse(res.error.text).errors[3].msg).to.equal('lastname is required', );
          expect(JSON.parse(res.error.text).errors[4].msg).to.equal('email is required', );
          done();
        });
    });
  });

  describe('when a user update their profile with a valid userId', () => {
    it('should return a  success message `Your profile was updated successfully ', (done) => {
      request
        .put(`/api/v1/user/${Id}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', jwtToken)
        .send({
          ...users[0],
          firstname: 'Blessing',
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('when a user update their profile with a invalid userId', () => {
    it('should return a  error message `User not Found ', (done) => {
      request
        .put('/api/v1/user/5a24367e7d1e6a29d8b33c2b')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', jwtToken)
        .send(users[0])
        .expect(404)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.a.property('error', 'User not Found');
          done();
        });
    });
  });

  describe('when a user want to reset password with the email field blank', () => {
    it('should return a  error message `email is required` ', (done) => {
      request
        .post('/api/v1/resetpassword')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          ...users[0],
          resetPasswordEmail: '',
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(JSON.parse(res.error.text).errors[0].msg).to.equal('email is required', );
          done();
        });
    });
  });

  describe('when a user want to reset password with an Invalid Email', () => {
    it('should return a  error message `Invalid email` ', (done) => {
      request
        .post('/api/v1/resetpassword')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          ...users[0],
          resetPasswordEmail: '@eroi3dd',
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.errors[0].msg).to.equal('Invalid email');
          done();
        });
    });
  });

  describe('when a user want to reset password with an Email that does not exist', () => {
    it('should return a  error message `Email does not exist` ', (done) => {
      request
        .post('/api/v1/resetpassword')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          resetPasswordEmail: 'ayeniblessing@gmail.com',
        })
        .expect(404)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.a.property('error', 'Email does not exist');
          done();
        });
    });
  });

  describe('when a user want to reset password with an Email that exist', () => {
    it('should return a success message `Check your email to continue resetting your password` ', (done) => {
      request
        .post('/api/v1/resetpassword')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          email: 'tomiwa@gmail.com',
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.a.property(
            'message',
            'Check your email to continue resetting your password',
          );
          done();
        });
    });
  });

  describe('when a user want to save a new password with newPassword field empty', () => {
    it('should return a  error message `New password is required` ', (done) => {
      request
        .put('/api/v1/resetpassword')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send(users[4])
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.errors[0].msg).to.equal('New password is required');
          done();
        });
    });
  });

  describe('when a user want to save a new password with confirmNewPassword field empty', () => {
    it('should return a  error message `confirmNewPassword is required` ', (done) => {
      request
        .put('/api/v1/resetpassword')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send(users[5])
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.errors[1].msg).to.equal('Please confirm password');
          done();
        });
    });
  });

  describe('when a user want to save a new password and passwords do not match', () => {
    it('should return a  error message `Password does not match` ', (done) => {
      request
        .put('/api/v1/resetpassword')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send(users[6])
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.errors[0].msg).to.equal('Password does not match');
          done();
        });
    });
  });

  describe('when a user want to save a new password with an Invalid token', () => {
    it('should return a error message `Invalid password reset token` ', (done) => {
      request
        .put('/api/v1/resetpassword')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send(users[7])
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.a.property(
            'error',
            'Invalid password reset token',
          );
          done();
        });
    });
  });
});
