import sendMail from '../../utils/sendMail';

const should = require('chai').should();

describe('sendMail', () => {
  it('should be a function', () => {
    sendMail.should.be.a('function');
  });
  it('should send an email if all conditions are met', () => {
    const receivers = [{ user: 'blessing.ayeni@andela.com' }];
    const messageBody = 'Hello World';
    const mailer = sendMail(receivers, messageBody);

    mailer.should.equal(true);
  });
});
