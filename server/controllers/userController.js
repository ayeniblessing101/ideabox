import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User';

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

/**
 * Registers a new user
 * @param {object} req - request object
 * @param {object} res - response object
 *
 * @return {object} - user object
 */
exports.signup = (req, res) => {
  req.checkBody('firstname', 'firstname is required').notEmpty();
  req.checkBody('lastname', 'lastname is required').notEmpty();
  req.checkBody('email', 'email is required').notEmpty();
  req.checkBody('password', 'password is required').notEmpty();
  req.checkBody('firstname', 'Invalid first name').isAlpha();
  req.checkBody('lastname', 'Invalid last name').isAlpha();
  req.checkBody('email', 'Invalid email').isEmail();
  req.sanitize('firstname').escape();
  req.sanitize('firstname').trim();
  req.sanitize('lastname').escape();
  req.sanitize('lastname').trim();
  req
    .checkBody(
      'password',
      'passwords must be at least 8 chars long and contain one number',
    )
    .isLength({ min: 8 })
    .matches(/\d/);

  // Run express validator
  const requestErrors = req.validationErrors();

  // creates a user object
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  });

  if (requestErrors) {
    res.status(400).json({ errors: requestErrors });
  } else {
    User.findOne({ email: req.body.email }).then((existingUser) => {
      if (existingUser) {
        return res.status(409).json({
          error: 'Email already exist',
        });
      }
      user
        .save()
        .then((userDetail) => {
          return res.status(201).json({
            user: {
              userId: userDetail._id,
              firstname: userDetail.firstname,
              lastname: userDetail.lastname,
              email: userDetail.email,
            },
            message: 'Signup successful',
            token: jwt.sign(
              { userId: userDetail._id, email: userDetail.email },
              process.env.SECRET,
              {
                expiresIn: process.env.AUTH_EXPIRY,
              },
            ),
          });
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    });
  }
};

/**
 * Sign in a new user
 * @param {object} req - response object
 * @param {object} res - request object
 *
 * @return {object} - login details
 */
exports.login = (req, res) => {
  req.checkBody('email', 'email is required').notEmpty();
  req.checkBody('email', 'Invalid email').isEmail();
  req.checkBody('password', 'password is required').notEmpty();

  // Run express validator
  const requestErrors = req.validationErrors();
  if (requestErrors) {
    res.status(400).json({ errors: requestErrors });
  } else {
    User.findOne({ email: req.body.email })
      .then((existingUser) => {
        if (existingUser) {
          if (bcrypt.compareSync(req.body.password, existingUser.password)) {
            res.status(200).json({
              user: {
                userId: existingUser._id,
                firstname: existingUser.firstname,
                lastname: existingUser.lastname,
                email: existingUser.email,
              },
              message: 'Log in Successful',
              token: jwt.sign(
                { userId: existingUser._id, email: existingUser.email },
                process.env.SECRET,
                {
                  expiresIn: process.env.AUTH_EXPIRY,
                },
              ),
            });
          } else {
            res.status(401).json({ error: 'Invalid Credential' });
          }
        } else {
          res.status(404).json({ error: 'User not Found' });
        }
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  }
};
