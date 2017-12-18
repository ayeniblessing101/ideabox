import chai from 'chai';

import Idea from '../../models/Idea';
import ideas from '../../tests/mockData/ideas.json';

const { expect } = chai;

describe('Idea Model', () => {
  before((done) => {
    Idea.remove({}).then(() => done());
  });
  it('should return a new idea data', (done) => {
    const newIdea = Idea(ideas[0]).save();

    expect(newIdea).to.be.an('object');
    expect(newIdea.title).to.equal(ideas[0].firstname);
    expect(newIdea.description).to.equal(ideas[0].lastname);
    expect(newIdea.ideaType).to.equal(ideas[0].ideaType);
    expect(newIdea.category).to.equal(ideas[0].category);
    expect(newIdea).to.have.a.property('user');
    done();
  });
});
