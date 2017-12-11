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
  const authorizationHeader = req.headers.authorization;
  let token;
  if (authorizationHeader) {
    token = authorizationHeader.split(' ')[1];
  }
  if (!token) {
    return res
      .status(401)
      .send({ message: 'Token is required for authorization' });
  }
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      res.status(401).send({ message: 'You are not an authorized User' });
    }
    req.decoded = decoded;
    next();
  });
};
