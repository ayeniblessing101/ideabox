import chai from 'chai';

import Comment from '../../models/Comment';
import comments from '../../tests/mockData/comments.json';

const { expect } = chai;

describe('Comment Model', () => {
  before((done) => {
    Comment.remove({}).then(() => done());
  });
  it('should return a new comment data', (done) => {
    const newComment = Comment(comments[0]).save();

    expect(newComment).to.be.an('object');
    expect(newComment.title).to.equal(comments[0].comment);
    expect(newComment).to.have.a.property('user');
    expect(newComment).to.have.a.property('idea');
    expect(newComment).to.have.a.property('comment');
    done();
  });
});
