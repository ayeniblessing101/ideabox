import jwt from 'jsonwebtoken';

/**
 * Function to check token
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 * @returns {void}
 */
module.exports = (req, res, next) => {
  let token =
    (req.body && req.body.access_token) ||
    (req.query && req.query.access_token) ||
    req.headers['x-access-token'];
  token = token.trim();
  if (!token) {
    return res
      .status(401)
      .send({ message: 'Token is required for authorization' });
  }
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return (
        res
          .status(401)
          //  .send({ message: 'You are not an authorized User' });
          .send({ message: err })
      );
    }
    req.decoded = decoded;
    next();
  });
};
