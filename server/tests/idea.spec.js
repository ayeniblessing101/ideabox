import supertest from 'supertest';
import chai from 'chai';
import Idea from '../models/Idea';
import app from '../app';
import comments from '../tests/mockData/comments.json';
import users from '../tests/mockData/users.json';
import ideas from '../tests/mockData/ideas.json';

const { expect } = chai;
const request = supertest(app);
let jwtToken;
let id;
let newIdeaId;

describe('Idea Controller', () => {
  before((done) => {
    Idea.remove({}).then(() => done());
  });
  before((done) => {
    request
      .post('/api/v1/user/login')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send(users[1])
      .end((err, res) => {
        if (res) {
          jwtToken = res.body.token;
          id = res.body.user.userId;
        }
        done();
      });
  });

  describe('when a user creates an Idea', () => {
    it('should return the idea details and a success message', (done) => {
      request
        .post('/api/v1/idea')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', jwtToken)
        .send({
          ...ideas[0],
          userId: id,
        })
        .expect(201)
        .end((err, res) => {
          newIdeaId = res.body.newIdea.ideaId;
          expect(res.body).to.be.an('object');
          expect(res.body.newIdea).to.be.an('object');
          expect(res.body.newIdea.ideaId).to.be.a('string');
          expect(res.body.newIdea.title).to.equal(ideas[0].title);
          expect(res.body.newIdea.description).to.equal(ideas[0].description);
          expect(res.body.newIdea.type).to.equal(ideas[0].ideaType);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.be.a('string');
          expect(res.body).to.have.a.property(
            'message',
            'Idea created successfully',
          );
          done();
        });
    });
  });

  describe('when a user creates an Idea with title field empty', () => {
    it('should return an error message `Title is required`', (done) => {
      request
        .post('/api/v1/idea')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', jwtToken)
        .send({
          ...ideas[0],
          title: '',
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(JSON.parse(res.error.text).errors[0].msg).to.equal('Title is required', );
          done();
        });
    });
  });

  describe('when a user creates an Idea with description field empty', () => {
    it('should return an error message `Description is required`', (done) => {
      request
        .post('/api/v1/idea')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', jwtToken)
        .send({
          ...ideas[0],
          description: '',
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.errors[0].msg).to.equal('Description is required');
          done();
        });
    });
  });

  describe('when a user creates an Idea that already exist', () => {
    it('should return an error message `Idea already exist`', (done) => {
      request
        .post('/api/v1/idea')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', jwtToken)
        .send({
          ...ideas[0],
          title: 'Chemical Engineering',
        })
        .expect(409)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.a.property('error', 'Idea already exist');
          done();
        });
    });
  });

  describe('when a user updates an Idea', () => {
    it('should return a success message `Idea was updated successfully`', (done) => {
      request
        .put(`/api/v1/idea/${newIdeaId}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', jwtToken)
        .send({
          ...ideas[0],
          title: 'Chemical Science',
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.a.property(
            'message',
            'Idea was updated successfully',
          );
          done();
        });
    });
  });

  describe('when a user updates an Idea that does not exist', () => {
    it('should return a success message `Idea not Found or You dont have the right to edit this Idea`', (done) => {
      request
        .put('/api/v1/idea/5a24367e7d1e6a29d8b33c2b')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', jwtToken)
        .send({
          ...ideas[0],
          title: 'Chemical Science',
        })
        .expect(404)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.a.property(
            'error',
            'Idea not Found or You dont have the right to edit this Idea',
          );
          done();
        });
    });
  });

  describe('when a user updates an Idea with the title field blank', () => {
    it('should return a success message `Title is required`', (done) => {
      request
        .put(`/api/v1/idea/${newIdeaId}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', jwtToken)
        .send({
          ...ideas[0],
          title: '',
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(JSON.parse(res.error.text).errors[0].msg).to.equal('Title is required', );
          done();
        });
    });
  });

  describe('when a user updates an Idea with the description field blank ', () => {
    it('should return a success message `Description is required`', (done) => {
      request
        .put(`/api/v1/idea/${newIdeaId}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', jwtToken)
        .send({
          ...ideas[0],
          description: '',
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.errors[0].msg).to.equal('Description is required');
          done();
        });
    });
  });

  describe('when a user add a comment to an idea ', () => {
    it('should return comment details and success message', (done) => {
      request
        .post(`/api/v1/idea/${newIdeaId}/comment`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', jwtToken)
        .send({
          ...comments[0],
          ideaId: newIdeaId,
          commentBy: id,
        })
        .expect(201)
        .end((err, res) => {
<<<<<<< HEAD
          console.log(res.body, '*******');
=======
>>>>>>> 3915dcbf868c16175b71b1f33663f3a3b265b2a2
          expect(res.body).to.be.an('object');
          expect(res.body.comment.ideaId).to.be.a('string');
          expect(res.body.comment.commentBy).to.be.a('string');
          expect(res.body.comment.comment).to.equal(comments[0].comment);
          expect(res.body).to.have.a.property(
            'message',
            'Comment added successfully',
          );
          done();
        });
    });
  });

  describe('when a user add a comment an Idea with the comment field blank', () => {
    it('should return a error message `Comment cannot be empty`', (done) => {
      request
        .post(`/api/v1/idea/${newIdeaId}/comment`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', jwtToken)
        .send({
          ...comments[1],
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.errors[0].msg).to.equal('Comment cannot be empty');
          done();
        });
    });
  });

  describe('when a user add a comment to an idea that does not exist ', () => {
    it('should return a error message `Idea not Found`', (done) => {
      request
        .post('/api/v1/idea/5a24367e7d1e6a29d8b33c2b/comment')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', jwtToken)
        .send({
          ...comments[0],
          ideaId: newIdeaId,
          commentBy: id,
        })
        .expect(404)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.a.property('message', 'Idea not found');
          done();
        });
    });
  });

  describe('when a user deletes an idea that does not exist ', () => {
    it('should return a success message `Idea not Found`', (done) => {
      request
        .delete('/api/v1/idea/5a24367e7d1e6a29d8b33c2b')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', jwtToken)
        .expect(404)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.a.property('error', 'Idea not Found');
          done();
        });
    });
  });

  describe('when a user deletes an idea ', () => {
    it('should return a success message `Idea successfully deleted`', (done) => {
      request
        .delete(`/api/v1/idea/${newIdeaId}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', jwtToken)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.a.property(
            'message',
            'Idea successfully deleted',
          );
          done();
        });
    });
  });
});
